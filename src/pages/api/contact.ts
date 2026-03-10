import type { APIRoute } from "astro";
import { Resend } from "resend";

const RESEND = new Resend(import.meta.env.RESEND_API_KEY);
const CONTACT_EMAIL = import.meta.env.CONTACT_EMAIL;

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Honeypot anti-spam
  const website = data.get("website");
  if (website) return new Response(null, { status: 200 });

  const nombre = data.get("nombre")?.toString().trim() || "";
  const email = data.get("email")?.toString().trim() || "";
  const telefono = data.get("telefono")?.toString().trim() || "";
  const empresa = data.get("empresa")?.toString().trim() || "";
  const motivo = data.get("motivo")?.toString().trim() || "";
  const mensaje = data.get("mensaje")?.toString().trim() || "";

  // Validación campos obligatorios
  if (!nombre || !email || !mensaje) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios" }),
      { status: 400 }
    );
  }

  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Email no válido" }),
      { status: 400 }
    );
  }

  // Sanitización
  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeTelefono = escapeHtml(telefono);
  const safeEmpresa = escapeHtml(empresa);
  const safeMotivo = escapeHtml(motivo);
  const safeMensaje = escapeHtml(mensaje);

  const cv = data.get("cv") as File | null;
  let attachments;

  // ✅ Si el motivo es "cv", el archivo es obligatorio
  if (motivo === "cv") {
    if (!cv || cv.size === 0) {
      return new Response(
        JSON.stringify({ error: "Debes adjuntar tu currículum en PDF" }),
        { status: 400 }
      );
    }
  }

  // ✅ Si hay archivo (porque lo subieron o es obligatorio)
  if (cv && cv.size > 0) {
    if (cv.size > 5 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "El CV supera 5MB" }),
        { status: 400 }
      );
    }

    if (cv.type !== "application/pdf") {
      return new Response(
        JSON.stringify({ error: "Solo se permiten PDFs" }),
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await cv.arrayBuffer());

    attachments = [
      {
        filename: cv.name.replace(/[^a-zA-Z0-9.\-_]/g, "_"),
        content: buffer,
      },
    ];
  }

  try {
    await RESEND.emails.send({
      from: "Fruit Service <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: "Nuevo mensaje - Fruit Service",
      replyTo: safeEmail,
      attachments,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2 style="color:#2c3e50;">Nuevo mensaje desde la web de Fruit Service</h2>

          <table style="border-collapse:collapse;width:100%;">
            <tr><td><strong>Motivo:</strong></td><td>${safeMotivo}</td></tr>
            <tr><td><strong>Nombre:</strong></td><td>${safeNombre}</td></tr>
            <tr><td><strong>Empresa:</strong></td><td>${safeEmpresa}</td></tr>
            <tr><td><strong>Email:</strong></td><td>${safeEmail}</td></tr>
            <tr><td><strong>Teléfono:</strong></td><td>${safeTelefono}</td></tr>
          </table>

          <hr style="margin:20px 0"/>

          <p><strong>Mensaje:</strong></p>
          <p>${safeMensaje}</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });

  } catch (error) {
    console.error("Error enviando email:", error);

    return new Response(
      JSON.stringify({ error: "Error enviando el email" }),
      { status: 500 }
    );
  }
};