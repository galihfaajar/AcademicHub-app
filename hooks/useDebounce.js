// hooks/useDebounce.js — Custom hook untuk debounce nilai
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // CLEANUP: Batalkan timer jika value berubah sebelum delay selesai
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
