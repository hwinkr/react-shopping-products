import { useState } from "react";

import ToastContext from "../contexts/toasts";
import { ToastState } from "../types/toasts";

export default function ToastsProvider({ children }: React.PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  return (
    <ToastContext.ToastStateContext.Provider value={toasts}>
      <ToastContext.ToastDispatchContext.Provider value={setToasts}>
        {children}
      </ToastContext.ToastDispatchContext.Provider>
    </ToastContext.ToastStateContext.Provider>
  );
}
