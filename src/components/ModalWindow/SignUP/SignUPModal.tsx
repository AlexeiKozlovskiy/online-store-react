import './../commonModal.scss';
import './SignUPModal.scss';
import { Form } from './Form';

interface ISignUPModal {
  setOpenModalSignUP: (value: boolean) => void;
  handelCloseModalSignUP: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignUPModal({ setOpenModalSignUP, handelCloseModalSignUP }: ISignUPModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalSignUP} data-id="close-modal-signUP">
      <div className="modal-page__container">
        <Form
          setOpenModalSignUP={setOpenModalSignUP}
          handelCloseModalSignUP={handelCloseModalSignUP}
        />
      </div>
    </div>
  );
}
