import './UserIcon.scss';
import { memo, useEffect, useState } from 'react';
import { useMyUserAuthContext } from '@/context/UserAuthContext';

export interface IUserIcon {
  handleClick?: React.MouseEventHandler;
}

export const UserIcon = memo(function UserIcon({ handleClick }: IUserIcon) {
  const { user } = useMyUserAuthContext();
  const [userData, setUserData] = useState({ name: '', userImage: '' });
  const { name, userImage } = userData;

  useEffect(() => {
    if (user) {
      const { isGoogle, picture, login } = user;

      if (isGoogle && picture) {
        setUserData({ ...userData, userImage: picture });
      } else {
        const name = login.slice(0, 1).toUpperCase();
        setUserData({ ...userData, name });
      }
    }
  }, [user?.login]);

  const userPicture = (
    <img
      className="google-logo"
      data-testid="user-image"
      src={userImage}
      alt="user image"
      onClick={handleClick}
    />
  );

  return (
    <div data-testid="user-icon" className="user-icon" onClick={handleClick}>
      {userImage ? userPicture : name}
    </div>
  );
});
