export type ToastType = "success" | "error" | "info" | "warning";

export function showToast(
  message: string,
  type: ToastType = "info",
  duration: number = 3000
): void {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}