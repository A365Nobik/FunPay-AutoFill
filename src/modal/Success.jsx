import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Success() {
  const divRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const div = divRef.current;
      if (div) {
        div.classList.add("-translate-x-120");
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [divRef]);
  return createPortal(
    <div
      ref={divRef}
      id="success"
      className="absolute animate-summon-right right-1 top-1/12 flex justify-center items-center bg-[var(--bg-primary)] p-1 rounded-md border-1 transition-all duration-300 text-[var(--text-primary)] font-cascadia"
    >
      <h1 className="text-lg">Сохранено</h1>
    </div>,
    document.querySelector("#root")
  );
}
