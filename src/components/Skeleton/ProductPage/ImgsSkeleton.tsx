import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './ImgsSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function ImgsSkeleton() {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="img-skeleton">
        <div className="img-skeleton__mini-img-container">
          <Skeleton className="img-skeleton__mini-img" />
          <Skeleton className="img-skeleton__mini-img" />
        </div>
        <Skeleton className="img-skeleton__max-img" />
      </div>
    </SkeletonTheme>
  );
}
