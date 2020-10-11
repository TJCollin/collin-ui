import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 300) => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVal(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return val;
};

export default useDebounce;
