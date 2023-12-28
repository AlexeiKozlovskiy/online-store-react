import './Product.scss';
import { Link } from 'react-router-dom';
import { Product, ROUTE } from '@/types/types';
import {
  addProductToCart,
  clearChosenProduct,
  removeAllProductsFromCart,
  setChosenProduct,
} from '@/store/controller';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { formatNameForURL } from '@/helpers/helpersFunc';
import { useEffect } from 'react';

type ProductViewData = {
  isInCart?: boolean;
  product: Product;
};

export function ProductItem({ isInCart, product }: ProductViewData) {
  const { data: products } = useGetProductsQuery();
  const { id, images, name, price, color, collection, size, category, stock } = product;

  useEffect(() => {
    clearChosenProduct();
  }, []);

  function productItemAddClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    addProductToCart(dataset.id!, products!);
  }

  function productItemRemoveClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    removeAllProductsFromCart(dataset.id!, products!);
  }

  const addToCart = (
    <div className="product-item__cart-add" data-id={id} onClick={productItemAddClick}>
      Add to cart
    </div>
  );

  const inCart = (
    <div className="product-item__cart-added" data-id={id} onClick={productItemRemoveClick}>
      In cart
    </div>
  );

  return (
    <div className="product-item">
      <Link
        to={`${ROUTE.PRODUCT}/${formatNameForURL(name)}`}
        onClick={() => setChosenProduct({ id, name })}
      >
        <img className="product-item__img" data-id={id} src={images[0]} alt="product image" />
      </Link>
      <div className="product-item__text-wrapper">{!isInCart ? addToCart : inCart}</div>
      <div className="product-item__info">
        <div className="item-info__name-price">
          <span className="item-info__name">{name}</span>
          <span className="item-info__price">${price}</span>
        </div>
        <div className="item-info__color">Color: {color}</div>
        <div className="item-info__colection">Colection: {collection}</div>
        <div className="item-info__size">Size: {size} cm</div>
        <div className="item-info__category">Category: {category}</div>
        <div className="item-info__in-stock">In stock: {stock}</div>
      </div>
    </div>
  );
}
