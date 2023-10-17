import { useEffect } from 'react';
import './PaymentPage.scss';
import { Form } from './Form';

interface IPaymentModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export function PaymentModal({ openModal, setOpenModal }: IPaymentModal) {
  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.payment-page');
    if (openModal) {
      container!.style.display = 'flex';
    }
    if (!openModal) {
      container!.style.display = 'none';
    }
  }, [openModal]);

  function handelCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal') {
      setOpenModal(false);
    }
  }

  return (
    <div
      className="main-catalog__payment-page payment-page"
      onClick={handelCloseModal}
      data-id="close-modal"
    >
      <div className="payment-page__container">
        <Form handelCloseModal={handelCloseModal} />
      </div>
    </div>
  );
}
