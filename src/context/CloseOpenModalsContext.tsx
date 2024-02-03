import { MODAL_WINDOWS } from '@/helpers/constant';
import { ModalsWindows } from '@/types/types';
import { useState, createContext, useContext, ReactNode } from 'react';

interface ICloseOpenModalsContext {
  openModals: ModalsWindows;
  setOpenModals: React.Dispatch<React.SetStateAction<ModalsWindows>>;
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeAnimationModal: (modalType: string) => void;
}

export const useCloseOpenModalsContext = () => useContext(CloseOpenModalsContext);

export const CloseOpenModalsContext = createContext<ICloseOpenModalsContext>({
  openModals: {
    modalPayment: false,
    modalSignUP: false,
    modalSignIN: false,
    modalUser: false,
  },
  setOpenModals: () => null,
  handelCloseModal: () => null,
  closeAnimationModal: () => null,
});

export const CloseOpenModalsContextProvider = ({ children }: { children: ReactNode }) => {
  const [openModals, setOpenModals] = useState<ModalsWindows>({
    modalPayment: false,
    modalSignUP: false,
    modalSignIN: false,
    modalUser: false,
  });

  function handelCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    const { SIGN_UP, SIGN_IN, USER, PAYMENT } = MODAL_WINDOWS;

    switch (dataset.id) {
      case SIGN_UP:
        closeAnimationModal(SIGN_UP);
        break;
      case SIGN_IN:
        closeAnimationModal(SIGN_IN);
        break;
      case USER:
        closeAnimationModal(USER);
        break;
      case PAYMENT:
        closeAnimationModal(PAYMENT);
        break;
    }
  }

  function closeAnimationModal(modalType: string) {
    const modalWindow = document.querySelector(`.${modalType}`) as HTMLDivElement;

    if (modalWindow) {
      modalWindow.classList.toggle(`${modalType}-hide`);
      setTimeout(() => {
        setOpenModals((prevOpenModals) => ({ ...prevOpenModals, [modalType]: false }));
      }, 400);
    }
  }

  return (
    <CloseOpenModalsContext.Provider
      value={{
        openModals,
        setOpenModals,
        handelCloseModal,
        closeAnimationModal,
      }}
    >
      {children}
    </CloseOpenModalsContext.Provider>
  );
};
