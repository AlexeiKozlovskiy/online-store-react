import { CloseOpenModals } from '@/types/types';
import { useState, createContext, useContext, ReactNode } from 'react';

interface ICloseOpenModalsContext {
  openModals: CloseOpenModals;
  setOpenModals: React.Dispatch<React.SetStateAction<CloseOpenModals>>;
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeModalSignInAnimation: () => void;
  closeModalSignUPAnimation: () => void;
  closeModalUserAnimation: () => void;
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
  closeModalSignInAnimation: () => null,
  closeModalSignUPAnimation: () => null,
  closeModalUserAnimation: () => null,
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
      case 'close-modal-signUP':
        closeModalSignUPAnimation();
        break;
      case 'close-modal-signIN':
        closeModalSignInAnimation();
        break;
      case 'close-modal-user':
        closeModalUserAnimation();
        break;
      case 'close-modal-profile':
        closeModalPaymentAnimation();
        break;
    }
  }

  function closeModalSignInAnimation() {
    const modalWindow = document.querySelector('.signIN-modal') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModals({ ...openModals, signIN: false });
    }, 400);
  }

  function closeModalSignUPAnimation() {
    const modalWindow = document.querySelector('.signUP-modal') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModals({ ...openModals, signUP: false });
    }, 400);
  }

  function closeModalUserAnimation() {
    const modalWindow = document.querySelector('.user-modal') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal-user');
    setTimeout(() => {
      setOpenModals({ ...openModals, user: false });
    }, 400);
  }

  function closeModalPaymentAnimation() {
    const modalWindow = document.querySelector('.profile-modal') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModals({ ...openModals, payment: false });
    }, 400);
  }

  return (
    <CloseOpenModalsContext.Provider
      value={{
        openModals,
        setOpenModals,
        handelCloseModal,
        closeModalSignInAnimation,
        closeModalSignUPAnimation,
        closeModalUserAnimation,
      }}
    >
      {children}
    </CloseOpenModalsContext.Provider>
  );
};
