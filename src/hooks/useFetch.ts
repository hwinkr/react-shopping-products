import { useCallback, useState } from "react";

export interface UseFetchResult {
  error: unknown;
  isLoading: boolean;
  fetcher: (
    callback: () => Promise<void>,
    addToast?: (message: string, duration?: number) => void,
  ) => Promise<void>;
}

export default function useFetch(): UseFetchResult {
  const [error, setError] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetcher = useCallback(
    async <T>(
      callback: () => Promise<T>,
      addToast?: (message: string, duration?: number) => void,
    ) => {
      setIsLoading(true);
      try {
        await callback();
      } catch (error) {
        setError(error);
        if (error instanceof Error && addToast) {
          addToast(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    error,
    isLoading,
    fetcher,
  };
}
