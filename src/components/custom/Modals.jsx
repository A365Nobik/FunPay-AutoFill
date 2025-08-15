import { SavedMsg, ResetedMsg } from "../../message";
import ResetConfirm from "../../modal/ResetConfirm";
import { ModalFunctions } from "../../custom/functions/modalFunctions";
import { useCallback } from "react";
import { UseChrome } from "../../hooks/UseChorme";
import Button from "../Button";

export default function Modals({
  isConfirmModal,
  confirmModalScale,
  setIsConfirmModal,
  setConfirmModalScale,
  isSaved,
  isReseted,
  setIsReseted,
}) {
  const chrome = UseChrome();
  const resetFields = useCallback(async () => {
    const formRef = document.querySelector("form");
    console.log(formRef);
    try {
      if (chrome?.storage?.local) {
        await chrome.storage.local.remove("autoFillData");
      } else {
        localStorage.removeItem("autoFillData");
      }
      const form = Object.entries(formRef.elements).map((el) => el[1]);
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
  }, [chrome, setConfirmModalScale, setIsConfirmModal, setIsReseted]);
  return (
    <>
      {isConfirmModal ? (
        <ResetConfirm scale={confirmModalScale}>
          <div className="flex justify-center items-center gap-1">
            <Button onClick={resetFields} bgColor={"bg-red-800"}>
              🔄Сбросить
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
              ◀️Назад
            </Button>
          </div>
        </ResetConfirm>
      ) : null}
      {isSaved ? <SavedMsg /> : null}
      {isReseted ? <ResetedMsg /> : null}
    </>
  );
}
