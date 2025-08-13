class ModalFunctionsClass {
  closeModal(setScale, modalState, setModalState) {
    if (modalState) {
      setScale(0);
      setTimeout(() => {
        setModalState(false);
      }, 300);
    } else {
      setModalState(true);
      setTimeout(() => {
        setScale(100);
      }, 300);
    }
  }
  closeModalClick(closests, setScale, setModalState, event) {
    const isOutClosest = closests.every((clst) => !event.target.closest(clst));
    if (isOutClosest) {
      setScale(0);
      setTimeout(() => {
        setModalState(false);
      }, 300);
    }
  }
  closeMocalKey(event, keys, setScale, setModalState) {
    if (keys.includes(event.key)) {
      setScale(0);
      setTimeout(() => {
        setModalState(false);
      }, 300);
    }
  }
}

export const ModalFunctions = new ModalFunctionsClass();
