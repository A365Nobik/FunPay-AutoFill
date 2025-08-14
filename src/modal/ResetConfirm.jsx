import { createPortal } from "react-dom";
import { Button } from "../components";

export default function ResetConfirm({ scale }) {
  return createPortal(
    <div
      className={`absolute top-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center bg-black/90 text-[var(--text-primary)] font-cascadia transition-all duration-300 ease-in-out ${
        scale ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      <div className="w-auto flex flex-col justify-center items-center bg-[var(--bg-secondary)] p-1 rounded-md">
        <h1 className="text-lg w-80 text-center">
          Вы действительно хотите сбросить поля?
        </h1>
        <div className="flex justify-center items-center gap-1">
          <Button bgColor={"bg-red-800"}>Сбросить</Button>
          <Button bgColor={"bg-[var(--bg-primary)]"}>Назад</Button>
        </div>
      </div>
    </div>,
    document.querySelector("form")
  );
}
