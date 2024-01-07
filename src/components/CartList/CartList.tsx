import '@/pages/CartPage/CartPage.scss';
import { Link } from 'react-router-dom';
import { CartItem, ROUTE } from '@/types/types';
import { formatNameForURL, formatPrice } from '@/helpers/helpersFunc';
import { QuantityPiecesCart } from '@/components/QuantityPieces/QuantityPiecesCart';
import { removeAllProductsFromCart, setChosenProduct } from '@/store/controller';
import { useAnimations } from '@/hooks/AnimationsHook';
import { useGetProductsQuery } from '@/api/ProductsAPI';
import { memo } from 'react';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

export const CartItemList = memo(function CartListItem({
  itemNumber,
  quantity,
  product: { id, images, name, color, collection, size, category, stock, price },
}: CartItem) {
  const { data: products } = useGetProductsQuery();

  function handelCrossClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    removeAllProductsFromCart(dataset.id!, products!);
  }

  const isShake = useAnimations({ quantity, stock });

  return (
    <tr className="cart-table__cart-item">
      <th className="cart-item__number">
        <span className="number-round">{itemNumber}</span>
      </th>
      <th className="cart-item__img-container">
        <Link
          to={`/${ROUTE.PRODUCT}/${formatNameForURL(name)}`}
          onClick={() => setChosenProduct({ id, name })}
        >
          <img className="cart-item__img" data-id={id} src={images[0]} alt="product image" />
        </Link>
      </th>
      <th className="cart-item__info">
        <h4 className="cart-item-info__name">{name}</h4>
        <div className="cart-item-info__color">Color: {color}</div>
        <div className="cart-item-info__collecrion">Collection: {collection}</div>
        <div className="cart-item-info__size">Size: {size}cm</div>
        <div className="cart-item-info__category">Category: {category}</div>
        <div className={`cart-item-info__instock ${isShake && 'shake-cart'}`} data-id={id}>
          In stock: {stock}
        </div>
      </th>
      <th className="cart-item__price">${price}</th>
      <th className="cart-item__quantity">
        <QuantityPiecesCart id={id} quantity={quantity} stock={stock} />
      </th>
      <th className="cart-item__subtotal">
        ${formatPrice(price * quantity)}
        <ButtonCross
          dataId={id}
          onClickCross={(e) => handelCrossClick(e)}
          adittionClassName="cart-item-cross"
        />
      </th>
    </tr>
  );
});
