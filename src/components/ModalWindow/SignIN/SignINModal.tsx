import './../commonModal.scss';
import './SignINModal.scss';
import { Form } from './Form';

interface ISignINModal {
  handelCloseModalSignIN: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignINModal({ handelCloseModalSignIN }: ISignINModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalSignIN} data-id="close-modal-signIN">
      <div className="modal-page__container">
        <Form handelCloseModalSignIN={handelCloseModalSignIN} />
      </div>
    </div>
  );
}
