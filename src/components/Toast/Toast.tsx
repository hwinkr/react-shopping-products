import { useEffect, useState } from "react";

import useToasts from "../../hooks/useToasts";

import * as Styled from "./Toast.style";
import { ToastState } from "../../types/toasts";

const Toast = ({ id, message, duration }: ToastState) => {
  const [isClose, setIsClose] = useState<boolean>(false);
  const { removeToast } = useToasts();

  useEffect(() => {
    if (!isClose) return;

    const removeTimer = setTimeout(() => {
      removeToast(id);
    }, 500);

    return () => {
      clearTimeout(removeTimer);
    };
  }, [isClose, removeToast, id]);

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setIsClose(true);
    }, duration);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [duration]);

  return (
    <Styled.Container isClose={isClose}>
      <Styled.ToastMessage>{message}</Styled.ToastMessage>
    </Styled.Container>
  );
};

export default Toast;
