import { useState, useCallback, useRef, useEffect } from "react";
import Select from "./components/Select";
import { UseChrome } from "./hooks/UseChorme";

export default function App() {
  const chrome = UseChrome();
  const spanClass = "flex justify-center items-center gap-1";
  const typeOpts = ["Предметы", "Услуги", "Аккаунты"];
  const getting = ["Трeйд", "Почта", "Прочее"];
  const [isItems, setIsItems] = useState(false);
  const formRef = useRef(null);
  const [error, setError] = useState(null);

  const loadSavedFielsd = useCallback(async () => {
    const form = Object.entries(formRef.current.elements).map((el) => el[1]);
    try {
      if (chrome?.storage?.local) {
        const { autoFillData } = await chrome.storage.local.get("autoFillData");
        form.forEach((field) => {
          field.value = autoFillData[field.name];
        });
      } else {
        const autoFillData = JSON.parse(localStorage.getItem("autoFillData"));
        form.forEach((field) => {
          field.value = autoFillData[field.name];
        });
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [chrome]);

  useEffect(() => {
    if (chrome) {
      console.log("Chrome API доступно");
    } else {
      console.warn("Chrome API недоступно");
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
        } else {
          localStorage.setItem("autoFillData", JSON.stringify(data));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [chrome]
  );

  return (
    <div className="flex flex-col justify-center items-center w-120 h-auto text-[var(--text-primary)] font-serif">
      <div className="w-full flex flex-col justify-center items-center gap-1 bg-[var(--bg-primary)] p-1">
        <form
          ref={formRef}
          className="flex flex-col justify-center items-start gap-1"
        >
          {error && (
            <div className="flex justify-center items-center bg-red-600 border-2 rounded-md">
              {error}
            </div>
          )}
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
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="fields[desc][ru]">Подробное Описание (RU)</label>
            <textarea
              name="fields[desc][ru]"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="fields[desc][ru]"
              type="text"
            />
          </span>
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="fields[payment_msg][ru]">
              Сообщение покупателю после оплаты (RU)
            </label>
            <textarea
              name="fields[payment_msg][ru]"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="fields[payment_msg][ru]"
              type="text"
            />
          </span>
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="fields[desc][en]">Подробное Описание (EN)</label>
            <textarea
              name="fields[desc][en]"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="fields[desc][en]"
              type="text"
            />
          </span>
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="fields[payment_msg][en]">
              Сообщение покупателю после оплаты (EN)
            </label>
            <textarea
              name="fields[payment_msg][en]"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="[payment_msg][en]"
              type="text"
            />
          </span>
        </form>
        <button
          type="submit"
          onClick={saveData}
          className="bg-[var(--bg-secondary)] p-2 rounded-md mt-2.5"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
