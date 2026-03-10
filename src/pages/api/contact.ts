import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const nombre = data.get('nombre')?.toString() || '';
  const email = data.get('email')?.toString() || '';
  const telefono = data.get('telefono')?.toString() || '';
  const empresa = data.get('empresa')?.toString() || '';
  const motivo = data.get('motivo')?.toString() || '';
  const mensaje = data.get('mensaje')?.toString() || '';

  if (!nombre || !email || !mensaje) {
    return new Response(
      JSON.stringify({ error: 'Faltan campos obligatorios' }),
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: 'Contacto Web desde Fruit Service',
      to: 'esther.martin.dev@outlook.es',
      subject: `Nuevo mensaje desde fruit-servis-portfolio.vercel.app`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje desde Fruit Service</h2>

        <p><strong>Motivo:</strong> ${motivo}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Empresa:</strong> ${empresa}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>

        <hr/>

        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>

        <hr/>
        <p>Enviado desde: fruit-servis-portfolio.vercel.app</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error enviando email:', error);

    return new Response(
      JSON.stringify({ error: 'Error enviando el email' }),
      { status: 500 }
    );
  }
};