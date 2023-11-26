import { CloseOpenModals } from '@/types/types';
import { useState, createContext, useContext, ReactNode } from 'react';

interface ICloseOpenModalsContext {
  openModals: CloseOpenModals;
  setOpenModals: React.Dispatch<React.SetStateAction<CloseOpenModals>>;
  handelCloseModalSignUP: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handelCloseModalSignIN: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handelCloseModalUser: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handelCloseModalPayment: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
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
  handelCloseModalSignUP: () => null,
  handelCloseModalSignIN: () => null,
  handelCloseModalUser: () => null,
  handelCloseModalPayment: () => null,
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
    }, 300);
  }

  function closeModalPaymentAnimation() {
    const modalWindow = document.querySelector('.profile-modal') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModals({ ...openModals, payment: false });
    }, 300);
  }

  function handelCloseModalSignUP(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-signUP') {
      closeModalSignUPAnimation();
    }
  }

  function handelCloseModalSignIN(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-signIN') {
      closeModalSignInAnimation();
    }
  }

  const handelCloseModalUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-user') {
      closeModalUserAnimation();
    }
  };

  function handelCloseModalPayment(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-profile') {
      closeModalPaymentAnimation();
    }
  }

  return (
    <CloseOpenModalsContext.Provider
      value={{
        openModals,
        setOpenModals,
        handelCloseModalSignUP,
        handelCloseModalSignIN,
        handelCloseModalUser,
        handelCloseModalPayment,
        closeModalSignInAnimation,
        closeModalSignUPAnimation,
        closeModalUserAnimation,
      }}
    >
      {children}
    </CloseOpenModalsContext.Provider>
  );
};
