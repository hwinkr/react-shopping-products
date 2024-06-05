import { useEffect, useRef } from "react";

const useIntersectionObserver = <T extends HTMLElement>(
  callback: () => void,
  options: IntersectionObserverInit = {
    threshold: 0.7,
  },
) => {
  const observerRef = useRef<T>(null);

  useEffect(() => {
    const currentObserverElement = observerRef.current;
    if (!currentObserverElement) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { ...options },
    );

    observer.observe(observerRef.current);

    return () => {
      if (!currentObserverElement) return;

      observer.unobserve(currentObserverElement);
      observer.disconnect();
    };
  }, [callback, options]);

  return observerRef;
};

export default useIntersectionObserver;
