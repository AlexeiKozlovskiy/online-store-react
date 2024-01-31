import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './UserProfileSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function UserProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="user-profile-skeleton__container">
        <Skeleton className="user-profile-skeleton__round" />
        <div data-testid="user-profile-skeleton" className="user-profile-skeleton__info-container">
          <Skeleton className="user-profile-skeleton__row-one" />
          <Skeleton className="user-profile-skeleton__row-two" />
        </div>
      </div>
    </SkeletonTheme>
  );
}
