import './ProductsList.scss';
import { useEffect, useState } from 'react';
import { ProductItem } from './Product';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem, Product, PageClickEvent } from '@/components/types/types';
import { useMyURLContext } from '@/components/Context/URLContext';
import { Pagination } from '@/components/Pagination/Pagination';

interface IProductsList {
  products: Product[];
}

export function ProductsList({ products }: IProductsList) {
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(products.length);
  const [itemOffset, setItemOffset] = useState(0);
  const { curPageMain, setCurPageMain, perMainPageOption, swichedView } = useMyURLContext();
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    perMainPageOption.value === 'all'
      ? setItemsPerPage(products.length)
      : setItemsPerPage(+perMainPageOption.value);
  }, [perMainPageOption]);

  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];

  useEffect(() => {
    const newOffset = ((curPageMain - 1) * itemsPerPage) % products.length;
    if (newOffset) {
      setItemOffset(newOffset);
    }
  }, [curPageMain, itemsPerPage]);

  useEffect(() => {
    if (curPageMain > pageCount) {
      setCurPageMain(1);
    }
  }, [curPageMain, pageCount]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setCurPageMain(event.selected + 1);
  };

  return (
    <>
      <div className={`main-catalog__products ${swichedView === 'row' ? 'row-view' : ''}`}>
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
      <Pagination curPage={curPageMain} pageCount={pageCount} handlePageClick={handlePageClick} />
    </>
  );
}
