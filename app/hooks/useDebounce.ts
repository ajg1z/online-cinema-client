import { useEffect, useRef, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => setDebounceValue(value), delay);
    } else timeRef.current = setTimeout(() => setDebounceValue(value), delay);

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
