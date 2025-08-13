import { useState, useCallback, useRef,useEffect } from "react";
import Select from "./components/select";

export default function App() {
  const spanClass = "flex justify-center items-center gap-1";
  const typeOpts = ["Предметы", "Услуги", "Аккаунты"];
  const getting = ["Трэйд", "Почта", "Прочее"];
  const [isItems, setIsItems] = useState(false);
  const formRef = useRef(null);
  const [error, setError] = useState(null);

const loadSavedFielsd=useCallback(async()=>{
  try {
    const data= await chrome
  } catch (error) {
    console.log(error)
    setError(error)
  }
},[])


  const saveData = useCallback(async(event) => {
    event.preventDefault();
    try {
      const data = formRef.current;
      const formData = new FormData(data);
      await localStorage.setItem(
        "autoFillData",
        JSON.stringify(Object.fromEntries(formData))
      );
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, []);

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
              name="typeSelect"
              setIsItems={setIsItems}
              options={typeOpts}
            />
          </span>

          {isItems && (
            <span className={spanClass}>
              <label htmlFor="gettingSelect">Способ получения:</label>
              <Select name="gettingSelect" options={getting} />
            </span>
          )}
          <hr className="w-full" />
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="bgDescRu">Подробное Описание (RU)</label>
            <textarea
              name="descRu"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="bgDescRu"
              type="text"
            />
          </span>
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="msgRu">
              Сообщение покупателю после оплаты (RU)
            </label>
            <textarea
              name="msgRu"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="msgRu"
              type="text"
            />
          </span>
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="descEn">Подробное Описание (EN)</label>
            <textarea
              name="descEn"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="descEn"
              type="text"
            />
          </span>
          <span className="flex flex-col justify-center items-start">
            <label htmlFor="msgEn">
              Сообщение покупателю после оплаты (EN)
            </label>
            <textarea
              name="msgEn"
              className="bg-[var(--bg-secondary)] border-2  rounded-md w-80 resize-none h-30 outline-0"
              id="msgEn"
              type="text"
            />
          </span>
        </form>
        <button
          type="sybmit"
          onClick={saveData}
          className="bg-[var(--bg-secondary)] p-2 rounded-md mt-2.5"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
