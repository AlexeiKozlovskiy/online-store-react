import { CloseOpenModals } from '@/types/types';
import { useState, createContext, useContext, ReactNode } from 'react';

interface ICloseOpenModalsContext {
  openModals: CloseOpenModals;
  setOpenModals: React.Dispatch<React.SetStateAction<CloseOpenModals>>;
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeAnimationModal: (modalType: string) => void;
}

export const useCloseOpenModalsContext = () => useContext(CloseOpenModalsContext);

export const CloseOpenModalsContext = createContext<ICloseOpenModalsContext>({
  openModals: {
    payment: false,
    signUP: false,
    signIN: false,
    user: false,
  },
  setOpenModals: () => null,
  handelCloseModal: () => null,
  closeAnimationModal: () => null,
});

export const CloseOpenModalsContextProvider = ({ children }: { children: ReactNode }) => {
  const [openModals, setOpenModals] = useState<CloseOpenModals>({
    payment: false,
    signUP: false,
    signIN: false,
    user: false,
  });

  function handelCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;

    switch (dataset.id) {
      case 'modal-signUP':
        closeAnimationModal('signUP');
        break;
      case 'modal-signIN':
        closeAnimationModal('signIN');
        break;
      case 'modal-user':
        closeAnimationModal('user');
        break;
      case 'modal-profile':
        closeAnimationModal('payment');
        break;
    }
  }

  function closeAnimationModal(modalType: string) {
    const modalWindow: HTMLDivElement | null = document.querySelector(`.${modalType}-modal`);
    if (modalWindow) {
      modalWindow.classList.toggle(`${modalType}-hide-modal`);
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
