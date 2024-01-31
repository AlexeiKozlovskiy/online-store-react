import './../commonModal.scss';
import './Payment.scss';
import { Form } from './Form';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface IPaymentModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function PaymentModal({ handelCloseModal }: IPaymentModal) {
  return (
    <div className="modal-page" onClick={handelCloseModal} data-id="modal-profile">
      <div className="modal-page__container payment-modal animation-view-form">
        <ButtonCross
          dataId="modal-profile"
          onClickCross={() => handelCloseModal}
          adittionClassName="close-modal-cross"
        />
        <Form />
      </div>
    </div>
  );
}
