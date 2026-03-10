import { showToast } from "../utils/toast";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>("#contact-form");
  const select = document.querySelector<HTMLSelectElement>("#subject-select");
  const upload = document.querySelector<HTMLElement>("#cv-upload");

  select?.addEventListener("change", (e) => {
    const target = e.target as HTMLSelectElement;
    if (upload) {
      upload.style.display = target.value === "cv" ? "block" : "none";
    }
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form) return;

    const formData = new FormData(form);

    showToast("Enviando...", "info");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showToast("✅ Mensaje enviado correctamente", "success");
        form.reset();
        if (upload) upload.style.display = "none";
      } else {
        const data = await res.json();
        showToast(data.error || "Error enviando mensaje", "error");
      }
    } catch {
      showToast("Error de conexión", "error");
    }
  });
});