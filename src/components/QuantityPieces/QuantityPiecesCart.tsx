import './QuantityPieces.scss';
import { useEffect, useState } from 'react';
import {
  addProductsToCart,
  removeProductsFromCart,
  setProductsQuantityInCart,
} from '@/components/reducers/controller';

interface IQuantity {
  id: number;
  quantity: number;
  stock: number;
}

export function QuantityPiecesCart({ id, quantity, stock }: IQuantity) {
  const [valuesPriceInput, setValuesPriceInput] = useState(quantity.toString());

  useEffect(() => {
    if (quantity >= 1) {
      setValuesPriceInput(quantity.toString());
    }
  }, [quantity]);

  function handelArrowAppClick() {
    addProductsToCart(Number(id));
  }

  function handelArrowDownClick() {
    removeProductsFromCart(Number(id));
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (+value < 0) {
      setValuesPriceInput('1');
      addProductsToCart(Number(id));
    } else if (+value >= stock) {
      setValuesPriceInput(stock.toString());
      setProductsQuantityInCart(Number(id), stock);
    } else {
      setValuesPriceInput(value);
      setProductsQuantityInCart(Number(id), Number(value));
    }
  }

  return (
    <div className="cart-item__qty">
      <div className="cart-item-qty__value-container">
        <input
          className="cart-item-qty__value-container quantity-input"
          type="number"
          value={valuesPriceInput}
          onChange={handelInput}
        />
      </div>
      <div className="cart-item-qty__arrow-container arrow-up" onClick={handelArrowAppClick}>
        <div className="cart-item-qty__arrow-up"></div>
      </div>
      <div className="cart-item-qty__arrow-container arrow-down" onClick={handelArrowDownClick}>
        <div className="cart-item-qty__arrow-down"></div>
      </div>
    </div>
  );
}
