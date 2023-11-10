import './Product.scss';
import { Link } from 'react-router-dom';
import { Product } from '@/types/types';
import { addProductsToCart, removeProductsFromCartAll } from '@/reducers/controller';
import { useGetProductsQuery } from '@/api/_productsAPI';
import { useMyURLContext } from '@/context/URLContext';
import { formatNameForURL } from '@/helpers/helpersFunc';

type ProductViewData = {
  isInCart: boolean;
  product: Product;
};

export function ProductItem({ isInCart, product }: ProductViewData) {
  const { setProductNameFromURL } = useMyURLContext();
  const { data: products } = useGetProductsQuery();

  const { id, images, name, price, color, collection, size, category, stock } = product;

  function productItemAddClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    addProductsToCart(dataset.id!, products!);
  }

  function productItemRemoveClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    removeProductsFromCartAll(dataset.id!, products!);
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
      <Link to={`/product/${formatNameForURL(name)}`}>
        <img
          className="product-item__img"
          onClick={() => setProductNameFromURL(formatNameForURL(name))}
          data-id={id}
          src={images[0]}
          alt="product image"
        />
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
