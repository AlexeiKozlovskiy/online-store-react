import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './InputSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function InputSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div data-testid="input-skeleton" className="input-skeleton__container">
        <Skeleton className="input-skeleton__field" />
      </div>
    </SkeletonTheme>
  );
}
