import './../commonModal.scss';
import './SignINModal.scss';
import { Form } from './Form';

interface ISignINModal {
  setOpenModalSignIN: (value: boolean) => void;
  handelCloseModalSignIN: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignINModal({ setOpenModalSignIN, handelCloseModalSignIN }: ISignINModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalSignIN} data-id="close-modal-signIN">
      <div className="modal-page__container">
        <Form
          setOpenModalSignIN={setOpenModalSignIN}
          handelCloseModalSignIN={handelCloseModalSignIN}
        />
      </div>
    </div>
  );
}
