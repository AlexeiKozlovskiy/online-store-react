import './UserModal.scss';
import { UserProfile } from '@/components/UserProfile/UserProfile';

interface IUserModal {
  onClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const UserModal = ({ onClickOutside }: IUserModal) => {
  return (
    <div className="modal-overlay" onClick={onClickOutside} data-id="close-modal-user">
      <div className="modal-window">
        <div className="modal-window__account">Account</div>
        <UserProfile />
        <hr className="modal-window__line"></hr>
        <p className="modal-window__log-out">Logout</p>
      </div>
    </div>
  );
};
