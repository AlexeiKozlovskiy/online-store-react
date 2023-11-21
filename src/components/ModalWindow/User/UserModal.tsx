import { useMyUserContext } from '@/context/UserContext';
import './UserModal.scss';
import { UserProfile } from '@/components/UserProfile/UserProfile';
import { Link, useNavigate } from 'react-router-dom';

interface IUserModal {
  onClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeModalUserAnimation: () => void;
}

export const UserModal = ({ onClickOutside, closeModalUserAnimation }: IUserModal) => {
  const { logOut } = useMyUserContext();
  const navigate = useNavigate();

  function handelClickLogout() {
    closeModalUserAnimation();
    logOut();
    navigate('/');
  }

  return (
    <div className="user-modal-overlay" onClick={onClickOutside} data-id="close-modal-user">
      <div className="user-modal">
        <div className="user-modal__account">Account</div>
        <UserProfile />
        <hr className="user-modal__line"></hr>
        <ul className="user-modal__list">
          <li className="user-modal__my-profile">
            <Link to="profile" className="my-profile-link" onClick={closeModalUserAnimation}>
              My profile
            </Link>
          </li>
          <li className="user-modal__log-out" onClick={() => handelClickLogout()}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};
