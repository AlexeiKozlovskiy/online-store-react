import { useMyUserContext } from '@/context/UserContext';
import './UserIcon.scss';

export interface IUserIcon {
  handleClick?: React.MouseEventHandler;
}

export const UserIcon = ({ handleClick }: IUserIcon) => {
  const { user } = useMyUserContext();

  function getFirstLettersOrImgUser() {
    if (user) {
      if (user.isGoogle) {
        return (
          <img
            className="google-logo"
            src={user?.picture}
            alt={user?.login}
            onClick={handleClick}
          />
        );
      } else {
        return user.login
          .split(' ')
          .map((el) => el.slice(0, 1))
          .join('');
      }
    }
  }
  return (
    <div className="user-icon" onClick={handleClick}>
      {getFirstLettersOrImgUser()}
    </div>
  );
};
