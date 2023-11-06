import { useMyUserContext } from '@/context/UserContext';
import './UserIcon.scss';

export interface IUserIcon {
  handleClick?: React.MouseEventHandler;
}

export const UserIcon = ({ handleClick }: IUserIcon) => {
  const { user } = useMyUserContext();

  return (
    <div className="user-icon" onClick={handleClick}>
      {user?.name.slice(0, 1)}
    </div>
  );
};
