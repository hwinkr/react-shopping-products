import React, { useContext } from "react";

import ToastContext from "../../../contexts/toasts";

import Toast from "../../Toast/Toast";
import * as Styled from "./Toasts.style";

export default function Toasts() {
  const toasts = useContext(ToastContext.ToastStateContext);

  if (toasts?.length === 0) return <></>;

  return (
    <Styled.ToastContainer>
      {toasts &&
        toasts.map((toast) => {
          return (
            <React.Fragment key={toast.id}>
              <Toast {...toast} />
            </React.Fragment>
          );
        })}
    </Styled.ToastContainer>
  );
}
