import { useMyUserContext } from '@/context/UserContext';
import './UserIcon.scss';
import { memo, useEffect, useState } from 'react';

export interface IUserIcon {
  handleClick?: React.MouseEventHandler;
}

export const UserIcon = memo(function UserIcon({ handleClick }: IUserIcon) {
  const { user } = useMyUserContext();
  const [userData, setUserData] = useState({ name: '', img: '' });
  const { name, img } = userData;

  useEffect(() => {
    if (user) {
      const { isGoogle, picture: img, login } = user;

      if (isGoogle && img) {
        setUserData({ ...userData, img });
      } else {
        const name = login.slice(0, 1).toUpperCase();
        setUserData({ ...userData, name });
      }
    }
  }, [user]);

  const userPicture = (
    <img className="google-logo" src={img} alt="user image" onClick={handleClick} />
  );

  return (
    <div className="user-icon" onClick={handleClick}>
      {img ? userPicture : name}
    </div>
  );
});
