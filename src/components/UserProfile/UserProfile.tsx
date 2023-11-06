import { useMyUserContext } from '@/context/UserContext';
import { UserIcon } from './UserIcon';

export const UserProfile = () => {
  const { user } = useMyUserContext();

  return (
    <div className="modal-window__person">
      <UserIcon />
      <div className="modal-person__name-email">
        <div className="modal-person__name">{user?.name}</div>
        <div className="modal-person__email">{user?.email}</div>
      </div>
    </div>
  );
};
