import { styled, keyframes } from "styled-components";

export const toastSlideIn = keyframes`
  from{
    opacity: 0;
  }to{
    opacity: 1;
  }
`;

export const toastSlideOut = keyframes`
  from{
    opacity: 1;
  }to{
    opacity: 0;
  }
`;

export const Container = styled.div<{ isClose: boolean }>`
  width: 400px;

  position: relative;
  padding: 0.8rem;
  gap: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: #ffc9c9;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  animation: ${({ isClose }) => (isClose ? toastSlideOut : toastSlideIn)} 0.4s ease-in-out forwards;
  overflow-x: hidden;
`;

export const ToastMessage = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: normal;

  color: #0a0d13;

  white-space: pre-line;
`;
