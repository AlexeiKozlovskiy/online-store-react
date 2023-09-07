import { Product } from '../types/product';
import { Link } from 'react-router-dom';
import './Product.scss';

export function ProductItem({
  id,
  name,
  price,
  collection,
  stock,
  color,
  size,
  category,
  images,
}: Product) {
  const image = new URL(images[0], import.meta.url).href;

  return (
    <Link to="/product" className="product-item" data-id={id}>
      <img className="product-item__img" data-id={id} src={image} alt="product image" />
      <div className="product-item__text-wrapper">
        <div className="product-item__cart-add" data-id={id}>
          Add to cart
        </div>
      </div>
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
    </Link>
  );
}
