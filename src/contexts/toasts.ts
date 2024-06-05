import { SetStateAction, createContext } from "react";

interface ToastState {
  id: string;
  message: string;
  duration?: number;
}

type ToastDispatch = React.Dispatch<SetStateAction<ToastState[]>>;

const ToastStateContext = createContext<ToastState[] | null>(null);
const ToastDispatchContext = createContext<ToastDispatch | null>(null);

const ToastContext = {
  ToastStateContext,
  ToastDispatchContext,
};

export default ToastContext;
