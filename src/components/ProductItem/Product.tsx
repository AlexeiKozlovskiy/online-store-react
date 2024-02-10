import './Product.scss';
import { Link } from 'react-router-dom';
import { CartItem, Product, ROUTE, RootReducerProps } from '@/types/types';
import {
  addProductToCart,
  clearChosenProduct,
  removeAllProductsFromCart,
  setChosenProduct,
} from '@/store/controller';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { formatNameForURL } from '@/helpers/helpersFunc';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FavoritesStar } from '@/components/FavoritesStar/FavoritesStar';

type ProductViewData = {
  product: Product;
};

export function ProductItem({ product }: ProductViewData) {
  const { data: products } = useGetProductsQuery('');
  const { id, images, name, price, color, collection, size, category, stock } = product;
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);

  useEffect(() => {
    clearChosenProduct();
  }, []);

  function productItemAddCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    addProductToCart(dataset.id!, products!);
  }

  function productItemRemoveCart(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    removeAllProductsFromCart(dataset.id!);
  }

  function getIsInCart(id: string) {
    return cartItemsState.some(({ product }) => product.id === id);
  }

  const addToCart = (
    <div className="product-item__cart-add" data-id={id} onClick={productItemAddCart}>
      Add to cart
    </div>
  );

  const inCart = (
    <div className="product-item__cart-added" data-id={id} onClick={productItemRemoveCart}>
      In cart
    </div>
  );

  return (
    <div className="product-item">
      <Link
        data-testid="product-item-chose"
        to={`/${ROUTE.PRODUCT}/${formatNameForURL(name)}`}
        onClick={() => setChosenProduct({ id, name })}
      >
        <img className="product-item__img" data-id={id} src={images[0]} alt="product image" />
      </Link>
      <div className="product-item__text-wrapper">{!getIsInCart(id) ? addToCart : inCart}</div>
      <FavoritesStar id={id} add_style={'product-add'} added_style={'product-added'} />
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
