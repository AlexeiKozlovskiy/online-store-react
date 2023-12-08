import './ProductsList.scss';
import { ProductItem } from './Product';
import { useSelector } from 'react-redux';
import { RootReducerProps, CartItem } from '@/types/types';
import { useMyURLContext } from '@/context/URLContext';
import { Pagination } from '@/components/Pagination/Pagination';
import { useMainPagination } from '@/components/CustomHook/MainPaginationHook';
import { Server, Client } from 'react-hydration-provider';
import products from '@/assets/data/products.json';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { MainSkeleton } from '@/components/Skeleton/MainPage/MainSkeleton';

export function ProductsList() {
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { swichedView } = useMyURLContext();
  const { countPages, curPageMain, currentItems, handlePageClick } = useMainPagination();
  const { isFetching } = useGetProductsQuery();

  const { perMainPageOption } = useMyURLContext();

  return (
    <>
      {isFetching && <MainSkeleton amount={+perMainPageOption.value} />}
      <Client>
        <div className={`main-catalog__products ${swichedView === 'row' && 'row-view'}`}>
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
      </Client>
      <Server>
        <div className="main-catalog__products hide">
          {products &&
            products.map((product) => <ProductItem key={product.id} product={product} />)}
        </div>
      </Server>
    </>
  );
}