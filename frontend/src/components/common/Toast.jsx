import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, type) => {
  switch (type) {
    case "info":
      return toast.info(message);
    case "success":
      return toast.success(message);
    case "warning":
      return toast.warn(message);
    case "error":
      return toast.error(message);
    default:
      return toast(message);
  }
};

export { showToast };
