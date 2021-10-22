import { toast } from "react-toastify";
export const notify = (message, autoClose = 3000) =>
  toast.success(message, {
    position: "top-right",
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    toastId: 1,
  });
