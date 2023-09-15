import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItem } from '@/components/types/types';
import { formatPrice } from '@/components/helpers/helpers';
import { QuantityPieces } from '@/components/QuantityPieces/QuantityPieces';
import { useMyIdContext } from '@/components/Context/ContextClickID';

export function CartListItem({
  id: itemId,
  quantity,
  product: { id, images, name, color, collection, size, category, stock, price },
}: CartItem) {
  const { setClickId } = useMyIdContext();

  return (
    <div className="cart-item">
      <div className="cart-item__content">
        <div className="cart-item__number">{itemId}</div>
        <Link to={`/product/${id}`} onClick={() => setClickId(id)}>
          <img className="cart-item__img" data-id={id} src={images[0]} alt="product image" />
        </Link>
        <div className="cart-item__info">
          <div className="cart-item-info__name">{name}</div>
          <div className="cart-item-info__color">Color: {color}</div>
          <div className="cart-item-info__collecrion">Collection: {collection}</div>
          <div className="cart-item-info__size">Size: {size}cm</div>
          <div className="cart-item-info__category">Category: {category}</div>
          <div className="cart-item-info__instock" data-id={id}>
            In stock: {stock}
          </div>
        </div>
        <div className="cart-item__price">${price}</div>
        <QuantityPieces />
        <div className="cart-item__subtotal">${formatPrice(price * quantity)}</div>
      </div>
      <div className="cart-item__cross" data-id={id}></div>
    </div>
  );
}
