import { useState } from "react";
import { Header, Form, Management, Modals } from "./components";

export default function App() {
  const [isSaved, setIsSaved] = useState(false);
  const [isReseted, setIsReseted] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [confirmModalScale, setConfirmModalScale] = useState(0);

  const formProps = {
    setIsSaved: setIsSaved,
    setIsReseted: setIsReseted,
    setConfirmModalScale: setConfirmModalScale,
    setIsConfirmModal: setIsConfirmModal,
    isConfirmModal: isConfirmModal,
    isSaved: isSaved,
    isReseted: isReseted,
  };

  const modalsProps = {
    isConfirmModal: isConfirmModal,
    confirmModalScale: confirmModalScale,
    setIsConfirmModal: setIsConfirmModal,
    setConfirmModalScale,
    isSaved: isSaved,
    isReseted: isReseted,
    setIsReseted: setIsReseted,
  };

  return (
    <>
      <div
        id="wrapp"
        className="relative flex flex-col justify-center items-center gap-1 p-8 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] text-[var(--text-primary)] text-lg font-roboto font-medium animate-fade-in"
      >
        <Header />
        <div>
          <Management />
          <div className="flex flex-col justify-center items-center bg-[var(--bg-secondary)] rounded-2xl border border-var(--border-color)] p-4">
            <Form {...formProps} />
            <Modals {...modalsProps} />
          </div>
        </div>
      </div>
    </>
  );
}
