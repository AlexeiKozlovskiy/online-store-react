import './../commonModal.scss';
import './Payment.scss';
import { Form } from './Form';

interface IPaymentModal {
  handelCloseModalPayment: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function PaymentModal({ handelCloseModalPayment }: IPaymentModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalPayment} data-id="close-modal-payment">
      <div className="modal-page__container">
        <Form handelCloseModalPayment={handelCloseModalPayment} />
      </div>
    </div>
  );
}
