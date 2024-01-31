import './UserModal.scss';
import { ROUTE } from '@/types/types';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { UserProfile } from '@/components/UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';

interface IUserModal {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeModalUserAnimation: () => void;
}

export const UserModal = ({ handelCloseModal, closeModalUserAnimation }: IUserModal) => {
  const { logOut } = useMyUserAuthContext();
  const navigate = useNavigate();

  function handelClickProfile() {
    closeModalUserAnimation();
    navigate(ROUTE.PROFILE);
  }

  function handelClickLogout() {
    closeModalUserAnimation();
    logOut();
    navigate(ROUTE.MAIN);
  }

  return (
    <div
      data-testid="user-modal-overlay"
      className="user-modal-overlay"
      onClick={handelCloseModal}
      data-id="close-modal-user"
    >
      <div className="user-modal">
        <div className="user-modal__account">Account</div>
        <UserProfile />
        <hr className="user-modal__line"></hr>
        <ul className="user-modal__list">
          <li className="user-modal__my-profile" onClick={handelClickProfile}>
            <button className="user-modal__button">My profile</button>
          </li>
          <li className="user-modal__log-out" onClick={handelClickLogout}>
            <button className="user-modal__button">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
