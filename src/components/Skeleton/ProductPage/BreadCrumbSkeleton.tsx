import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './BreadCrumbSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function BreadCrumbSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <Skeleton className="bread-crumb-skeleton" />
    </SkeletonTheme>
  );
}
