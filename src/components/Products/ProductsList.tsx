import './ProductsList.scss';
import './Paginations.scss';

import { useEffect, useState } from 'react';
import { ProductItem } from './Product';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem, Product } from '@/components/types/types';
import ReactPaginate from 'react-paginate';
import { useMyURLContext } from '@/components/Context/URLContext';

interface IProductsList {
  swichedView: string;
  products: Product[];
  itemsPerPage: number;
}

export function ProductsList({ swichedView, products, itemsPerPage }: IProductsList) {
  const [currentItems, setCurrentItems] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(products.length);
  const [itemOffset, setItemOffset] = useState(0);
  const { curPage, setCurPage } = useMyURLContext();

  const cartItems = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];

  useEffect(() => {
    const newOffset = ((curPage - 1) * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  }, [curPage]);

  useEffect(() => {
    if (curPage > pageCount) {
      setCurPage(1);
    }
  }, [curPage, pageCount]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setCurPage(event.selected + 1);
  };

  return (
    <>
      <div className={`main-catalog__products ${swichedView === 'line' ? 'row-view' : ''}`}>
        {currentItems &&
          currentItems.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              isInCart={cartItems.some(({ product: inCartProduct }) => {
                return inCartProduct.id === product.id;
              })}
            />
          ))}
      </div>
      <ReactPaginate
        forcePage={curPage - 1}
        className="react-paginate"
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
