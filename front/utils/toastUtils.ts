import toast from "react-hot-toast";

// Success toast
export const showSuccessToast = (message: string) =>
  toast.success(message, {
    duration: 3000,
    icon: "✅",
    style: {
      border: "1px solid #22c55e",
      padding: "12px",
      color: "#166534",
    },
  });

// Error toast
export const showErrorToast = (message: string) =>
  toast.error(message, {
    duration: 3000,
    icon: "❌",
    style: {
      border: "1px solid #f87171",
      padding: "12px",
      color: "#991b1b",
    },
  });
