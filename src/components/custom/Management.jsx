import { useState, useEffect, useCallback } from "react";
import { UseChrome } from "../../hooks/UseChorme";
import { IoMdSettings, IoMdPower } from "react-icons/io";

export default function Management() {
  const chrome = UseChrome();
  const [isActive, setIsActive] = useState(true);
  const checkIsActive = useCallback(async () => {
    if (chrome?.storage?.local) {
      const { isActive } = await chrome.storage.local.get("isActive");
      if (isActive) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      const isActive = localStorage.getItem("isActive");
      if (isActive === "true") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [chrome]);
  const changeActive = useCallback(async () => {
    try {
      const newValue = !isActive;
      setIsActive(newValue);
      const chromeStorage = chrome.storage.local;
      await chromeStorage.set({ isActive: newValue });
    } catch (error) {
      console.error(error);
    }
  }, [chrome, isActive]);
  useEffect(() => {
    checkIsActive();
  }, [checkIsActive]);
  return (
    <div className="flex justify-center items-center gap-1 text-3xl mb-2.5">
      <button
        title={isActive ? "Расширение активно" : "Расширение неактивно"}
        className={`p-1 rounded-lg transition-all duration-200 hover-lift  ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <IoMdPower onClick={changeActive} />
      </button>
      <button
      className="p-1 rounded-lg transition-all duration-200 hover:bg-[var(--bg-primary)] hover-lift"
       title="Настройки">
        <IoMdSettings />
      </button>
    </div>
  );
}
