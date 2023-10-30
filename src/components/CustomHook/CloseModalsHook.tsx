import { useState } from 'react';

export function useCloseModalsHook() {
  const [openModalSignUP, setOpenModalSignUP] = useState(false);
  const [openModalSignIN, setOpenModalSignIN] = useState(false);
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);

  function handelCloseModalSignUP(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-signUP') {
      const modalWindow = document.querySelector('.signUP-form') as HTMLDivElement;
      modalWindow.classList.toggle('hide-modal');
      setTimeout(() => {
        setOpenModalSignUP(false);
      }, 400);
    }
  }

  function handelCloseModalSignIN(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-signIN') {
      const modalWindow = document.querySelector('.signIN-form') as HTMLDivElement;
      modalWindow.classList.toggle('hide-modal');
      setTimeout(() => {
        setOpenModalSignIN(false);
      }, 400);
    }
  }

  const handelCloseModalUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-user') {
      const modalWindow = document.querySelector('.modal-window') as HTMLDivElement;
      modalWindow.classList.toggle('hide-modal-user');
      setTimeout(() => {
        setOpenModalUser(false);
      }, 300);
    }
  };

  function handelCloseModalPayment(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal-payment') {
      const modalWindow = document.querySelector('.payment-details__info') as HTMLDivElement;
      modalWindow.classList.toggle('hide-modal');
      setTimeout(() => {
        setOpenModalPayment(false);
      }, 300);
    }
  }

  return {
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
  };
}
