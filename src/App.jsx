/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useRef, useEffect } from "react";
import Select from "./components/Select";
import { UseChrome } from "./hooks/UseChorme";
import Success from "./modal/Success";
import TextArea from "./components/TextArea";
import { ModalFunctions } from "./custom/functions/modalFunctions";

export default function App() {
  const chrome = UseChrome();
  const spanClass = "flex justify-center items-center gap-1";
  const typeOpts = ["Предметы", "Услуги", "Аккаунты"];
  const getting = ["Трeйд", "Почта", "Прочее"];
  const closests = ["#button", "#success"];
  const [isItems, setIsItems] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [scale, setScale] = useState(0);
  const formRef = useRef(null);

  const textAreaProps = {
    "fields[desc][ru]": "Подробное Описание (RU)",
    "fields[payment_msg][ru]": "Сообщение покупателю после оплаты (RU)",
    "fields[desc][en]": "Подробное Описание (EN)",
    "[payment_msg][en]": "Сообщение покупателю после оплаты (EN)",
  };

  useEffect(() => {
    if (chrome) {
      console.log("Chrome API доступно");
    } else {
      console.warn("Chrome API недоступно");
    }
  }, [chrome]);

  useEffect(() => {
    if (isSuccess) {
      const closeHandle = (event) =>
        ModalFunctions.closeModalClick(closests, setScale, setIsSuccess, event);
      document.body.addEventListener("click", closeHandle);
      return () => document.body.removeEventListener("click", closeHandle);
    }
  }, [isSuccess, closests]);

  const loadSavedFielsd = useCallback(async () => {
    const form = Object.entries(formRef.current.elements).map((el) => el[1]);
    try {
      if (chrome?.storage?.local) {
        const { autoFillData } = await chrome.storage.local.get("autoFillData");
        form.forEach((field) => {
          field.value = autoFillData[field.name];
          if (field.name == "fields[method]") {
            console.log(autoFillData[field.name]);
          }
        });
      } else {
        const autoFillData = JSON.parse(localStorage.getItem("autoFillData"));
        console.log(autoFillData);
        form.forEach((field) => {
          field.value = autoFillData[field.name];
          if (autoFillData[field.name] === "fields[method]") {
            console.log(123);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [chrome]);

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
            setIsSuccess(true);
            ModalFunctions.closeModal(setScale, isSuccess, setIsSuccess);
          } else {
            console.warn("не успех");
          }
        } else {
          localStorage.setItem("autoFillData", JSON.stringify(data));
          if (JSON.parse(localStorage.getItem("autoFillData"))) {
            setIsSuccess(true);
            ModalFunctions.closeModal(setScale, isSuccess, setIsSuccess);
          } else {
            console.warn("не успех");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [chrome, isSuccess]
  );
  return (
    <>
      {isSuccess && (
        <Success scale={scale}>
          <button
            onClick={() => {
              setScale(0);
              setTimeout(() => {
                setIsSuccess(false);
              }, 300);
            }}
            className="bg-[var(--bg-primary)] p-1 rounded-md transition-transform hover:scale-105 active:scale-95 text-lg"
          >
            Закрыть
          </button>
        </Success>
      )}
      <div className="flex flex-col justify-center items-center w-100 h-auto text-[var(--text-primary)] font-cascadia relative">
        <div className="w-full flex flex-col justify-center items-center gap-1 bg-[var(--bg-primary)] p-1">
          <form
            ref={formRef}
            className="flex flex-col justify-center items-start gap-1"
          >
            <span className={spanClass}>
              <label htmlFor="typeSelect">Тип предложения:</label>
              <Select
                name="fields[type]"
                setIsItems={setIsItems}
                options={typeOpts}
              />
            </span>
            {isItems && (
              <span className={spanClass}>
                <label htmlFor="gettingSelect">Способ получения:</label>
                <Select name="fields[method]" options={getting} />
              </span>
            )}
            <hr className="w-full" />
            {Object.entries(textAreaProps).map((prop, idx) => (
              <TextArea key={idx} label={prop[1]} name={prop[0]} />
            ))}
          </form>
          <button
            id="button"
            type="submit"
            onClick={saveData}
            className="bg-[var(--bg-secondary)] p-2 rounded-md mt-2.5"
          >
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
}
