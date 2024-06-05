import { SetStateAction } from "react";

export interface ToastState {
  id: string;
  message: string;
  duration?: number;
}

export type ToastDispatch = React.Dispatch<SetStateAction<ToastState[]>>;
