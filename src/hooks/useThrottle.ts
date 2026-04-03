import { useEffect, useRef, useState } from 'react';

export default function useThrottle<T>(value: T, delay = 350): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedRef = useRef(Date.now());
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const remaining = delay - (now - lastExecutedRef.current);

    if (remaining <= 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setThrottledValue(value);
      lastExecutedRef.current = now;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setThrottledValue(value);
      lastExecutedRef.current = Date.now();
      timeoutRef.current = null;
    }, remaining);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
}
