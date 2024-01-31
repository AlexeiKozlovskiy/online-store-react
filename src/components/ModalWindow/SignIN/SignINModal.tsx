import './../commonModal.scss';
import './SignINModal.scss';
import { Form } from './Form';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface ISignINModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignINModal({ handelCloseModal }: ISignINModal) {
  return (
    <div className="modal-page" onClick={handelCloseModal} data-id="modal-signIN">
      <div className="modal-page__container signIN-modal animation-view-form">
        <ButtonCross
          dataId="modal-signIN"
          onClickCross={() => handelCloseModal}
          adittionClassName="close-modal-cross"
        />
        <Form />
      </div>
    </div>
  );
}
