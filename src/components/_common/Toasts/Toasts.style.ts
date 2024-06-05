import styled from "styled-components";

export const ToastContainer = styled.section`
  width: 100%;

  position: fixed;
  right: 0;
  left: 0;
  top: 64px;

  opacity: 0.9;

  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 12px;
  z-index: 999;
`;
