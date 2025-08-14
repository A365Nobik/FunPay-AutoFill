/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useRef, useEffect } from "react";
import { UseChrome } from "./hooks/UseChorme";
import Success from "./message/Success";
import ResetConfirm from "./modal/ResetConfirm";
import { ModalFunctions } from "./custom/functions/modalFunctions";
import { Select, TextArea, Button } from "./components";
import { spanClass, typeOpts, getting, textAreaProps } from "./constants";

export default function App() {
  const chrome = UseChrome();
  const [isItems, setIsItems] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [scale, setScale] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (chrome) {
      console.log("Chrome API доступно");
    } else {
      console.warn("Chrome API недоступно");
    }
  }, [chrome]);

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

  const removeSavedFields = () => {
    const form = Object.entries(formRef.current.elements).map((el) => el[1]);
    form.forEach((field) => {
      field.value = "";
    });
  };

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
          } else {
            console.warn("не успех");
          }
        } else {
          localStorage.setItem("autoFillData", JSON.stringify(data));
          if (JSON.parse(localStorage.getItem("autoFillData"))) {
            setIsSuccess(true);
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
  const resetData = async (event) => {
    event.preventDefault();
    ModalFunctions.handleModal(setScale, isConfirm, setIsConfirm);
    // try {
    //   if (chrome?.storage?.local) {
    //     await chrome.storage.local.remove("autoFillData");
    //   } else {
    //     localStorage.removeItem("autoFillData");
    //   }
    //   removeSavedFields();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSuccess) {
        setIsSuccess(false);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <>
      <div className="relative flex flex-col justify-center items-start gap-1 bg-[var(--bg-primary)] p-1 text-[var(--text-primary)] font-cascadia text-[16px]">
        <form
          ref={formRef}
          className="flex flex-col justify-center items-start gap-1 w-full"
        >
          <div className="flex flex-col justify-center items-start">
            <span className={spanClass}>
              <label htmlFor="fields[type]">Тип предложения:</label>
              <Select
                id="fields[type]"
                name="fields[type]"
                setIsItems={setIsItems}
                options={typeOpts}
              />
            </span>
            <span hidden={!isItems} className={spanClass}>
              <label htmlFor="fields[method]">Способ получения:</label>
              <Select
                name="fields[method]"
                id="fields[method]"
                options={getting}
              />
            </span>
          </div>
          <hr className="w-full" />
          <div className="flex flex-col justify-center items-start">
            {Object.entries(textAreaProps).map((prop, idx) => (
              <TextArea key={idx} label={prop[1]} name={prop[0]} />
            ))}
          </div>
          <div className="flex justify-between items-start w-80">
            <Button bgColor={"bg-green-700"} onClick={saveData}>
              Сохранить
            </Button>
            <Button bgColor={"bg-red-800"} onClick={resetData}>
              Сбросить
            </Button>
          </div>
        </form>
      </div>
      {isConfirm ? <ResetConfirm scale={scale} /> : null}
      {isSuccess ? <Success /> : null}
    </>
  );
}
