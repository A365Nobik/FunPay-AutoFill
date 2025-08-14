import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function MessageWrapper({ message }) {
  const divRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      const div = divRef.current;
      if (div) {
        div.classList.add("-translate-x-170");
      }
    }, 2250);
    return () => clearTimeout(timer);
  }, [divRef]);
  return createPortal(
    <div
      ref={divRef}
      id="success"
      className="absolute animate-summon-right right-1 -top-1 translate-y-2 flex justify-center items-center bg-[var(--bg-primary)] p-1 rounded-md border-1 transition-all duration-300 text-[var(--text-primary)] font-cascadia"
    >
      <h1 className="text-[16px]">{message}</h1>
    </div>,
    document.querySelector('#wrapp')
  );
}
