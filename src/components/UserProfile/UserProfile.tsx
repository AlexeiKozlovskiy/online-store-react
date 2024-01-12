import './UserProfile.scss';
import { memo } from 'react';
import { UserIcon } from './UserIcon';
import { useMyUserAuthContext } from '@/context/UserAuthContext';

export const UserProfile = memo(function UserProfile() {
  const { user } = useMyUserAuthContext();

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
