import { useState, useCallback, useRef, useEffect } from "react";
import { UseChrome } from "./hooks/UseChorme";
import { SavedMsg, ResetedMsg } from "./message/";
import ResetConfirm from "./modal/ResetConfirm";
import { ModalFunctions } from "./custom/functions/modalFunctions";
import { Select, TextArea, Button, Span } from "./components";
import { typeOpts, getting, textAreaProps } from "./constants";
import { IoMdSettings, IoMdPower } from "react-icons/io";

export default function App() {
  const chrome = UseChrome();
  const [isActive, setIsActive] = useState(true);
  const [isItems, setIsItems] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [confirmModalScale, setConfirmModalScale] = useState(0);
  const formRef = useRef(null);

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

  useEffect(() => {
    checkIsActive();
  }, [checkIsActive]);

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

  const resetFields = useCallback(async () => {
    try {
      if (chrome?.storage?.local) {
        await chrome.storage.local.remove("autoFillData");
      } else {
        localStorage.removeItem("autoFillData");
      }
      const form = Object.entries(formRef.current.elements).map((el) => el[1]);
      form.forEach((field) => {
        field.value = "";
      });
      ModalFunctions.closeModalClick(
        null,
        setConfirmModalScale,
        setIsConfirmModal,
        null
      );
      setIsReseted(true);
    } catch (error) {
      console.error(error);
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
    loadSavedFielsd();
  }, [loadSavedFielsd]);

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
      confirmModalScale,
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
  }, [isSaved, isReseted]);

  return (
    <>
      <div
        id="wrapp"
        className="relative flex flex-col justify-center items-center gap-1 bg-[var(--bg-primary)] text-[var(--text-primary)] font-cascadia text-[16px]"
      >
        <form
          ref={formRef}
          className="w-full flex flex-col justify-center items-center gap-1 p-1"
        >
          <div
            className={`w-full flex ${
              !isItems ? "justify-start" : "justify-between"
            } items-center gap-2`}
          >
            <Span>
              <label htmlFor="fields[type]">Тип предложения:</label>
              <Select
                id="fields[type]"
                name="fields[type]"
                setIsItems={setIsItems}
                options={typeOpts}
              />
            </Span>
            <span
              className={`flex justify-center items-center gap-1 ${
                !isItems ? "ml-7.75" : null
              } text-2xl`}
            >
              <IoMdPower
                onClick={changeActive}
                className={`${
                  isActive ? "text-green-500" : "text-[var(--bg-secondary)]"
                }`}
              />
              <IoMdSettings />
            </span>
            <Span hidden={!isItems}>
              <label htmlFor="fields[method]">Способ получения:</label>
              <Select
                name="fields[method]"
                id="fields[method]"
                options={getting}
              />
            </Span>
          </div>
          <hr className="w-full" />
          <div className="grid grid-cols-2 justify-center items-start gap-2">
            {Object.entries(textAreaProps).map((prop, idx) => (
              <TextArea key={idx} label={prop[1]} name={prop[0]} />
            ))}
          </div>
          <div className=" w-full flex justify-around items-center">
            <Button bgColor={"bg-green-700"} onClick={saveData}>
              Сохранить
            </Button>
            <Button bgColor={"bg-red-800"} onClick={handleResetClick}>
              Сбросить
            </Button>
          </div>
        </form>
      </div>
      {isConfirmModal ? (
        <ResetConfirm scale={confirmModalScale}>
          <div className="flex justify-center items-center gap-1">
            <Button onClick={resetFields} bgColor={"bg-red-800"}>
              Сбросить
            </Button>
            <Button
              onClick={() =>
                ModalFunctions.closeModalClick(
                  null,
                  setConfirmModalScale,
                  setIsConfirmModal,
                  null
                )
              }
              bgColor={"bg-[var(--bg-primary)]"}
            >
              Назад
            </Button>
          </div>
        </ResetConfirm>
      ) : null}
      {isSaved ? <SavedMsg /> : null}
      {isReseted ? <ResetedMsg /> : null}
    </>
  );
}
