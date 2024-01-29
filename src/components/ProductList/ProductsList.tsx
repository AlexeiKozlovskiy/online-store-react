import './ProductsList.scss';
import { ProductItem } from '../ProductItem/Product';
import { useSelector } from 'react-redux';
import { RootReducerProps, CartItem, ProductsQweryParams } from '@/types/types';
import { useMyURLContext } from '@/context/URLContext';
import { Pagination } from '@/components/Pagination/Pagination';
import { useMainPagination } from '@/hooks/MainPaginationHook';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { MainSkeleton } from '@/components/Skeleton/MainPage/MainSkeleton';
import { useEffect, useState } from 'react';

interface ProductsList {
  clickFilters: boolean;
}

export function ProductsList({ clickFilters }: ProductsList) {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { swichedView } = useMyURLContext();
  const { countPages, curPageMain, currentItems, handlePageClick } = useMainPagination({
    clickFilters,
  });
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>(
    (state) => state.productsQweryParams
  );
  const { isFetching } = useGetProductsQuery(qweryParams);
  const { perMainPageOption } = useMyURLContext();
  const [itemsInPage, setItemsInPage] = useState(20);

  useEffect(() => {
    if (perMainPageOption.value === 'all') {
      setItemsInPage(30);
    } else {
      setItemsInPage(+perMainPageOption.value);
    }
  }, [perMainPageOption]);

  function getIsInCart(id: string) {
    return cartItemsState.some(({ product }) => product.id === id);
  }

  return (
    <>
      {isFetching && <MainSkeleton itemsInPage={itemsInPage} />}
      <div
        className={`main-catalog__products ${swichedView === 'row' && 'row-view'}`}
        data-testid="main-catalog"
      >
        {currentItems &&
          currentItems.map((product) => (
            <ProductItem key={product.id} product={product} isInCart={getIsInCart(product.id)} />
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
