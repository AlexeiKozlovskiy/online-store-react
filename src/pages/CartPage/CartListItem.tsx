import './CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItem } from '@/types/types';
import { formatNameForURL, formatPrice } from '@/helpers/helpersFunc';
import { QuantityPiecesCart } from '@/components/QuantityPieces/QuantityPiecesCart';
import { removeProductsFromCartAll } from '@/reducers/controller';
import { useAnimations } from '@/components/CustomHook/AnimationsHook';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { useMyURLContext } from '@/context/URLContext';
import { memo } from 'react';

export const CartListItem = memo(function CartListItem({
  itemNumber,
  quantity,
  product: { id, images, name, color, collection, size, category, stock, price },
}: CartItem) {
  const { setProductNameFromURL } = useMyURLContext();
  const { data: products } = useGetProductsQuery();

  function handelCrossClick(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    removeProductsFromCartAll(dataset.id!, products!);
  }

  const isShake = useAnimations({ quantity, stock });

  return (
    <div className="cart-item">
      <div className="cart-item__content">
        <div className="cart-item__number">{itemNumber}</div>
        <Link
          to={`/product/${formatNameForURL(name)}`}
          onClick={() => setProductNameFromURL(formatNameForURL(name))}
        >
          <img className="cart-item__img" data-id={id} src={images[0]} alt="product image" />
        </Link>
        <div className="cart-item__info">
          <div className="cart-item-info__name">{name}</div>
          <div className="cart-item-info__color">Color: {color}</div>
          <div className="cart-item-info__collecrion">Collection: {collection}</div>
          <div className="cart-item-info__size">Size: {size}cm</div>
          <div className="cart-item-info__category">Category: {category}</div>
          <div className={`cart-item-info__instock ${isShake ? 'shake-cart' : ''}`} data-id={id}>
            In stock: {stock}
          </div>
        </div>
        <div className="cart-item__price">${price}</div>
        <QuantityPiecesCart id={id} quantity={quantity} stock={stock} />
        <div className="cart-item__subtotal">${formatPrice(price * quantity)}</div>
      </div>
      <div className="cart-item__cross" data-id={id} onClick={(e) => handelCrossClick(e)}></div>
    </div>
  );
});
