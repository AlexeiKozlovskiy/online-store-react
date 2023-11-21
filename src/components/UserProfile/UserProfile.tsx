import { useMyUserContext } from '@/context/UserContext';
import { UserIcon } from './UserIcon';
import './UserProfile.scss';
import { memo } from 'react';

export const UserProfile = memo(function UserProfile() {
  const { user } = useMyUserContext();

  return (
    <div className="user-profile">
      <UserIcon />
      <div className="user-profile__name-email">
        <div className="user-profile__name">{user?.login}</div>
        <div className="user-profile__email">{user?.email}</div>
      </div>
    </div>
  );
});
