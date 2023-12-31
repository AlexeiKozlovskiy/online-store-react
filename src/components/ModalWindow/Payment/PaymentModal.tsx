import './../commonModal.scss';
import './Payment.scss';
import { Form } from './Form';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface IPaymentModal {
  handelCloseModalPayment: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function PaymentModal({ handelCloseModalPayment }: IPaymentModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalPayment} data-id="close-modal-profile">
      <div className="modal-page__container profile-modal animation-view-form">
        <ButtonCross
          dataId="close-modal-profile"
          onClickCross={() => handelCloseModalPayment}
          adittionClassName="close-modal-cross"
        />
        <Form />
      </div>
    </div>
  );
}
