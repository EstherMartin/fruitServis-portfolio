import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL;
const resend = new Resend(import.meta.env.RESEND_API_KEY);

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    if (formData.get('website')) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), { status: 400 });
    }

    const motivo = escapeHtml(formData.get('motivo') as string || "");
    const nombre = escapeHtml(formData.get('nombre') as string || "");
    const empresa = escapeHtml(formData.get('empresa') as string || "");
    const email = escapeHtml(formData.get('email') as string || "");
    const telefono = escapeHtml(formData.get('telefono') as string || "");
    const mensaje = escapeHtml(formData.get('mensaje') as string || "");
    const cvFile = formData.get('cv') as File | null;

    if (!motivo || !nombre || !email || !mensaje) {
      return new Response(JSON.stringify({ error: 'Campos requeridos faltantes' }), { status: 400 });
    }

    let attachments = [];
    if (cvFile && cvFile.size > 0) {
      const buffer = await cvFile.arrayBuffer();
      attachments.push({
        filename: cvFile.name,
        content: Buffer.from(buffer),
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'Fruit Service web <onboarding@resend.dev>',
      to: CONTACT_EMAIL,
      subject: `${motivo}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Motivo:</strong> ${motivo}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        ${telefono ? `<p><strong>Teléfono:</strong> ${telefono}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      `,
      ...(attachments.length > 0 && { attachments })
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};