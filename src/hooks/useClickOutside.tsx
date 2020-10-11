import { RefObject, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e?: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      } else {
        handler(e);
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
