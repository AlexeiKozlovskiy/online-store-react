import './../commonModal.scss';
import './SignINModal.scss';
import { Form } from './Form';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface ISignINModal {
  handelCloseModalSignIN: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function SignINModal({ handelCloseModalSignIN }: ISignINModal) {
  return (
    <div className="modal-page" onClick={handelCloseModalSignIN} data-id="close-modal-signIN">
      <div className="modal-page__container signIN-modal animation-view-form">
        <ButtonCross onClickCross={() => handelCloseModalSignIN} dataId={'close-modal-signIN'} />
        <Form />
      </div>
    </div>
  );
}
