import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './NameSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function NameSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="name-skeleton__container">
        <Skeleton className="name-skeleton__name" />
        <Skeleton className="name-skeleton__name-row-two" />
      </div>
    </SkeletonTheme>
  );
}
