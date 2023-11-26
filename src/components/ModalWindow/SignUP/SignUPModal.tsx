import './../commonModal.scss';
import './SignUPModal.scss';
import { Form } from './Form';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface ISignUPModal {
  handelCloseModalSignUP: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignUPModal({ handelCloseModalSignUP }: ISignUPModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalSignUP} data-id="close-modal-signUP">
      <div className="modal-page__container signUP-modal animation-view-form">
        <ButtonCross
          dataId="close-modal-signUP"
          onClickCross={() => handelCloseModalSignUP}
          adittionClassName="close-modal-cross"
        />
        <Form />
      </div>
    </div>
  );
}
