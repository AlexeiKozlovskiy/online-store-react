import './../commonModal.scss';
import './SignUPModal.scss';
import { Form } from './Form';

interface ISignUPModal {
  handelCloseModalSignUP: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignUPModal({ handelCloseModalSignUP }: ISignUPModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalSignUP} data-id="close-modal-signUP">
      <div className="modal-page__container">
        <Form handelCloseModalSignUP={handelCloseModalSignUP} />
      </div>
    </div>
  );
}
