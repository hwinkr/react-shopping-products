import { useCallback, useContext } from "react";

import ToastContext from "../contexts/toasts";

const useToasts = () => {
  const toastContext = useContext(ToastContext.ToastDispatchContext);

  if (!toastContext) {
    throw new Error("toasts context does not exists.");
  }

  const setToasts = toastContext;

  const removeToast = useCallback(
    (id: string) => {
      setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
    },
    [setToasts],
  );

  const addToast = useCallback(
    (message: string, duration: number = 2000) => {
      const randomId = Math.random().toString(36).substring(2, 16);
      const newToast = {
        id: randomId,
        duration,
        message,
      };

      setToasts((prevToasts) => [...prevToasts, newToast]);
    },
    [setToasts],
  );

  return {
    addToast,
    removeToast,
  };
};

export default useToasts;
