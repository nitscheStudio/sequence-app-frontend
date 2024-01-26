import React, { useEffect } from "react";

type Ref = React.MutableRefObject<HTMLElement | null>;
type Callback = () => void;

export function useClickOutside(ref: Ref, callback: Callback) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
