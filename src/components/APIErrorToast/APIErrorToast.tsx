import useToast from '../../hooks/useToast';
import Toast from '../Toast/Toast';

interface APIErrorToastProps {
  message: string;
}

export default function APIErrorToast({ message }: APIErrorToastProps) {
  const { isToastOpen, closeToast } = useToast(true);

  return (
    <>
      {isToastOpen && (
        <Toast
          message={message}
          onClose={closeToast}
        />
      )}
    </>
  );
}
