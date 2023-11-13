import { useState, createContext, useContext, ReactNode } from 'react';

interface ICloseOpenModalsContext {
  openModalSignUP: boolean;
  setOpenModalSignUP: (value: boolean) => void;
  openModalSignIN: boolean;
  setOpenModalSignIN: (value: boolean) => void;
  openModalUser: boolean;
  setOpenModalUser: (value: boolean) => void;
  openModalPayment: boolean;
  setOpenModalPayment: (value: boolean) => void;
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
  openModalSignUP: false,
  setOpenModalSignUP: () => null,
  openModalSignIN: false,
  setOpenModalSignIN: () => null,
  openModalUser: false,
  setOpenModalUser: () => null,
  openModalPayment: false,
  setOpenModalPayment: () => null,
  handelCloseModalSignUP: () => null,
  handelCloseModalSignIN: () => null,
  handelCloseModalUser: () => null,
  handelCloseModalPayment: () => null,
  closeModalSignInAnimation: () => null,
  closeModalSignUPAnimation: () => null,
  closeModalUserAnimation: () => null,
});

export const CloseOpenModalsContextProvider = ({ children }: { children: ReactNode }) => {
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [openModalSignUP, setOpenModalSignUP] = useState(false);
  const [openModalSignIN, setOpenModalSignIN] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);

  function closeModalSignInAnimation() {
    const modalWindow = document.querySelector('.signIN-form') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModalSignIN(false);
    }, 400);
  }

  function closeModalSignUPAnimation() {
    const modalWindow = document.querySelector('.signUP-form') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModalSignUP(false);
    }, 400);
  }

  function closeModalUserAnimation() {
    const modalWindow = document.querySelector('.user-modal') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal-user');
    setTimeout(() => {
      setOpenModalUser(false);
    }, 300);
  }

  function closeModalPaymentAnimation() {
    const modalWindow = document.querySelector('.payment-details__info') as HTMLDivElement;
    modalWindow.classList.toggle('hide-modal');
    setTimeout(() => {
      setOpenModalPayment(false);
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
    if (dataset.id === 'close-modal-payment') {
      closeModalPaymentAnimation();
    }
  }

  return (
    <CloseOpenModalsContext.Provider
      value={{
        openModalSignUP,
        setOpenModalSignUP,
        openModalSignIN,
        setOpenModalSignIN,
        openModalUser,
        setOpenModalUser,
        openModalPayment,
        setOpenModalPayment,
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
