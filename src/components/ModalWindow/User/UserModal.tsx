import { useMyUserContext } from '@/context/UserContext';
import './UserModal.scss';
import { UserProfile } from '@/components/UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@/types/types';

interface IUserModal {
  onClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeModalUserAnimation: () => void;
}

export const UserModal = ({ onClickOutside, closeModalUserAnimation }: IUserModal) => {
  const { logOut } = useMyUserContext();
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
    <div className="user-modal-overlay" onClick={onClickOutside} data-id="close-modal-user">
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
