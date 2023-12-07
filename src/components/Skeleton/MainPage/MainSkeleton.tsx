import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './MainSkeleton.scss';
import 'react-loading-skeleton/dist/skeleton.css';

export function MainSkeleton({ amount }: { amount: number }) {
  return (
    <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e7e7e7">
      <div className="cards-skeleton-list">
        {Array(amount)
          .fill(0)
          .map((_el, ind) => (
            <div key={ind} className="card-skeleton">
              <div className="card-skeleton__img">
                <Skeleton width={250} height={250} />
              </div>
              <div className="card-skeleton__text">
                <div className="card-skeleton__name">
                  <Skeleton width={250} height={20} />
                </div>
                <div className="card-skeleton__info">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={140} height={20} />
                  <Skeleton width={120} height={20} />
                  <Skeleton width={200} height={20} />
                  <Skeleton width={140} height={20} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </SkeletonTheme>
  );
}
