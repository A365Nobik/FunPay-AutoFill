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
        className="relative flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] text-[var(--text-primary)] font-inter min-h-screen p-6"
      >
        {/* Header с градиентом */}
        <div className="w-full max-w-4xl text-center mb-6 animate-slide-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent mb-2">
            FunPay Auto Fill
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Автоматическое заполнение форм для карточек товаров
          </p>
        </div>

        {/* Основная форма */}
        <div className="w-full max-w-4xl glass rounded-2xl p-8 shadow-2xl animate-fade-in">
          <form
            ref={formRef}
            className="w-full flex flex-col justify-center items-center gap-6"
          >
            {/* Верхняя секция с селектами */}
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-6 p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <Span variant="primary" className="flex-1">
                <Select
                  id="fields[type]"
                  name="fields[type]"
                  setIsItems={setIsItems}
                  options={typeOpts}
                  label="Тип предложения"
                />
              </Span>

              {/* Кнопки управления */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={changeActive}
                  className={`
                    p-3 rounded-xl transition-all duration-300 ease-out hover-lift
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[var(--bg-success)] to-[#047857] text-white shadow-lg animate-pulse-glow"
                        : "bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]"
                    }
                  `}
                  title={
                    isActive ? "Расширение активно" : "Расширение неактивно"
                  }
                >
                  <IoMdPower className="text-2xl" />
                </button>

                <button
                  type="button"
                  className="p-3 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-all duration-200 ease-out hover-lift"
                  title="Настройки"
                >
                  <IoMdSettings className="text-2xl" />
                </button>
              </div>

              <Span variant="default" className="flex-1" hidden={!isItems}>
                <Select
                  name="fields[method]"
                  id="fields[method]"
                  options={getting}
                  label="Способ получения"
                />
              </Span>
            </div>

            {/* Разделитель */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent"></div>

            {/* Текстовые поля */}
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-start gap-6 w-full">
              {Object.entries(textAreaProps).map((prop, idx) => (
                <TextArea
                  key={idx}
                  label={prop[1]}
                  name={prop[0]}
                  placeholder={`Введите ${prop[1].toLowerCase()}...`}
                />
              ))}
            </div>

            {/* Кнопки действий */}
            <div className="w-full flex flex-col sm:flex-row justify-around items-center gap-4 pt-4">
              <Button
                variant="success"
                size="lg"
                onClick={saveData}
                className="flex-1 max-w-xs"
              >
                💾 Сохранить
              </Button>
              <Button
                variant="danger"
                size="lg"
                onClick={handleResetClick}
                className="flex-1 max-w-xs"
              >
                🔄 Сбросить
              </Button>
            </div>
          </form>
        </div>

        {/* Статусные сообщения */}
        {isSaved && (
          <div className="fixed top-4 right-4 animate-slide-up">
            <SavedMsg />
          </div>
        )}
        {isReseted && (
          <div className="fixed top-4 right-4 animate-slide-up">
            <ResetedMsg />
          </div>
        )}
      </div>

      {/* Модальное окно подтверждения */}
      {isConfirmModal && (
        <ResetConfirm scale={confirmModalScale}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button onClick={resetFields} variant="danger" size="md">
              🔄 Сбросить
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
              variant="ghost"
              size="md"
            >
              ← Назад
            </Button>
          </div>
        </ResetConfirm>
      )}
    </>
  );
}
