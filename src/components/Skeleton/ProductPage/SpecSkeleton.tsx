import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './SpecSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function SpecSkeleton({ width }: { width: number }) {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <Skeleton className="spec-skeleton" width={width} />
    </SkeletonTheme>
  );
}
