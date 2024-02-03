import './../commonModal.scss';
import './SignUPModal.scss';
import { Form } from './Form';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface ISignUPModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignUPModal({ handelCloseModal }: ISignUPModal) {
  return (
    <div className="modal-page" onClick={handelCloseModal} data-id="modalSignUP">
      <div className="modal-page__container modalSignUP animation-view-form">
        <ButtonCross
          dataId="modalSignUP"
          onClickCross={() => handelCloseModal}
          adittionClassName="close-modal-cross"
        />
        <Form />
      </div>
    </div>
  );
}
