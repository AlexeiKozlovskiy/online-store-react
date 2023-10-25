import './ProductsList.scss';
import { useEffect, useState } from 'react';
import { ProductItem } from './Product';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem, Product, PageClickEvent } from '@/types/types';
import { useMyURLContext } from '@/context/URLContext';
import { Pagination } from '@/components/Pagination/Pagination';

interface IProductsList {
  products: Product[];
}

export function ProductsList({ products }: IProductsList) {
  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const { curPageMain, setCurPageMain, perMainPageOption, swichedView } = useMyURLContext();
  const [countPages, setCountPages] = useState(curPageMain);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(+perMainPageOption.value);

  const countProducts = products.length;

  useEffect(() => {
    if (perMainPageOption.value === 'all' && countProducts) {
      setItemsPerPage(countProducts);
    } else if (countProducts) {
      setItemsPerPage(+perMainPageOption.value);
    }
  }, [perMainPageOption, countProducts]);

  useEffect(() => {
    const newOffset = ((curPageMain - 1) * itemsPerPage) % countProducts;
    if (newOffset) {
      setItemOffset(newOffset);
    }
  }, [curPageMain, itemsPerPage, products]);

  useEffect(() => {
    if (countProducts && itemsPerPage) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setCountPages(Math.ceil(countProducts / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event: PageClickEvent) => {
    const newOffset = (event.selected * itemsPerPage) % countProducts;
    setItemOffset(newOffset);
    setCurPageMain(event.selected + 1);
  };

  return (
    <>
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
      <Pagination curPage={curPageMain} countPages={countPages} handlePageClick={handlePageClick} />
    </>
  );
}
