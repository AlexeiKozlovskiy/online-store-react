import './ProductsList.scss';
import { ProductItem } from '../ProductItem/Product';
import { useSelector } from 'react-redux';
import { RootReducerProps, CartItem } from '@/types/types';
import { useMyURLContext } from '@/context/URLContext';
import { Pagination } from '@/components/Pagination/Pagination';
import { useMainPagination } from '@/hooks/MainPaginationHook';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { MainSkeleton } from '@/components/Skeleton/MainPage/MainSkeleton';

interface ProductsList {
  clickFilters: boolean;
}

export function ProductsList({ clickFilters }: ProductsList) {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { swichedView } = useMyURLContext();
  const { countPages, curPageMain, currentItems, handlePageClick } = useMainPagination({
    clickFilters,
  });
  const { isFetching } = useGetProductsQuery();
  const { perMainPageOption } = useMyURLContext();

  return (
    <>
      {isFetching && <MainSkeleton amount={+perMainPageOption.value} />}
      <div
        className={`main-catalog__products ${swichedView === 'row' && 'row-view'}`}
        data-testid="main-catalog"
      >
        {currentItems &&
          currentItems.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isInCart={cartItemsState.some(({ product: inCartProduct }) => {
                return inCartProduct.id === product.id;
              })}
            />
          ))}
      </div>
      {
        <Pagination
          curPage={curPageMain}
          countPages={countPages}
          handlePageClick={handlePageClick}
        />
      }
    </>
  );
}
