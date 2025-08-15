import { useState, useRef, useEffect, useCallback } from "react";
import { textAreaProps } from "../constants";
import { UseChrome } from "../hooks/UseChorme";
import { ModalFunctions } from "../custom/functions/modalFunctions";
import { TextArea, Button } from "./";
import { SelectBlock } from "./custom";

export default function Form({
  setIsSaved,
  setIsReseted,
  setIsConfirmModal,
  setConfirmModalScale,
  isConfirmModal,
  isSaved,
  isReseted,
}) {
  const [isItems, setIsItems] = useState(false);
  const chrome = UseChrome();
  const formRef = useRef(null);

  const loadSavedFielsd = useCallback(async () => {
    const form = Object.entries(formRef.current.elements).map((el) => el[1]);
    try {
      if (chrome?.storage?.local) {
        const { autoFillData } = await chrome.storage.local.get("autoFillData");
        form.forEach((field) => {
          field.value = autoFillData[field.name];
          if (autoFillData[field.name] === "Предметы") {
            setIsItems(true);
          }
        });
      } else {
        const autoFillData = JSON.parse(localStorage.getItem("autoFillData"));
        console.log(autoFillData);
        form.forEach((field) => {
          field.value = autoFillData[field.name];
          if (autoFillData[field.name] === "Предметы") {
            setIsItems(true);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [chrome]);

  const saveData = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData);
      try {
        if (chrome?.storage?.local) {
          await chrome.storage.local.set({ autoFillData: data });
          if (await chrome.storage.local.get("autoFillData")) {
            setIsSaved(true);
          } else {
            console.warn("не успех");
          }
        } else {
          localStorage.setItem("autoFillData", JSON.stringify(data));
          if (JSON.parse(localStorage.getItem("autoFillData"))) {
            setIsSaved(true);
          } else {
            console.warn("не успех");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [chrome, setIsSaved]
  );
  const handleResetClick = async (event) => {
    event.preventDefault();
    ModalFunctions.handleModal(
      setConfirmModalScale,
      isConfirmModal,
      setIsConfirmModal
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSaved) {
        setIsSaved(false);
      } else if (isReseted) {
        setIsReseted(false);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isSaved, isReseted, setIsReseted, setIsSaved]);
  useEffect(() => {
    loadSavedFielsd();
  }, [loadSavedFielsd]);

  return (
    <form
      ref={formRef}
      className="w-full flex flex-col justify-center items-center gap-1 bg-[var(--bg-secondary)] animate-fade-in border border-[var(--border)"
    >
      <SelectBlock isItems={isItems} setIsItems={setIsItems} />
      <hr className="w-full" />
      <div className="grid grid-cols-2 justify-center items-start gap-2">
        {Object.entries(textAreaProps).map((prop, idx) => (
          <TextArea
            key={idx}
            label={prop[1]}
            name={prop[0]}
            placeholder={`Введите ${prop[1].toLowerCase()}...`}
          />
        ))}
      </div>
      <div className="w-full flex justify-around items-center mt-2.5">
        <Button bgColor={"bg-green-700"} onClick={saveData}>
          💾Сохранить
        </Button>
        <Button bgColor={"bg-red-800"} onClick={handleResetClick}>
          🔄Сбросить
        </Button>
      </div>
    </form>
  );
}
