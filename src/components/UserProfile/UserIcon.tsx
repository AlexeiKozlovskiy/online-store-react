import './UserIcon.scss';
import { useEffect, useState } from 'react';
import { useMyUserAuthContext } from '@/context/UserAuthContext';

export interface IUserIcon {
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const UserIcon = ({ handleClick }: IUserIcon) => {
  const { user } = useMyUserAuthContext();
  const [userData, setUserData] = useState({ name: '', userImage: '' });
  const { name, userImage } = userData;

  useEffect(() => {
    if (user) {
      const { isGoogle, picture, login } = user;

      if (isGoogle && picture) {
        setUserData({ name: '', userImage: picture });
      } else {
        const name = login.slice(0, 1).toUpperCase();
        setUserData({ name, userImage: '' });
      }
    }
  }, [user?.login]);

  const userPicture = (
    <img
      className="google-logo"
      data-testid="user-image"
      data-id="modalUser"
      src={userImage}
      alt="user image"
      onClick={handleClick}
    />
  );

  return (
    <div data-testid="user-icon" data-id="modalUser" className="user-icon" onClick={handleClick}>
      {userImage ? userPicture : name}
    </div>
  );
};
