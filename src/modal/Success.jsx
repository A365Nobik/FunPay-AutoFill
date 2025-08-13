import { createPortal } from "react-dom";
import { useRef, useEffect } from "react";

export default function Success() {
  const divRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (divRef.current) {
        divRef.current.classList.add("scale-0");
        divRef.current.classList.add("opacity-0");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [divRef]);
  return createPortal(
    <div
      ref={divRef}
      className={`absolute animate-summon-right right-1 top-1/12 flex justify-center items-center text-[var(--text-primary)] font-cascadia transition-all duration-300`}
    >
      <div
        id="success"
        className="flex flex-col justify-center items-center bg-[var(--bg-primary)] p-1 rounded-md border-1"
      >
        <h1 className="text-lg">Сохранено</h1>
      </div>
    </div>,
    document.querySelector("#root")
  );
}
