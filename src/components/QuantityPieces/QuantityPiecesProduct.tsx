import './QuantityPieces.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/components/types/types';
import products from '@/assets/data/products.json';

interface IQuantity {
  onChangeQty: (value: string) => void;
  onResetInput: boolean;
  clickId: number;
}

export function QuantityPiecesProduct({ onChangeQty, onResetInput, clickId }: IQuantity) {
  const [inputValue, setInputValue] = useState('1');
  const [stock, setStock] = useState(0);
  const cartItems = useSelector((state: CartItemReducerProps) => state.cart) as unknown as CartItem[];

  // добавить класс для max stock
  useEffect(() => {
    products.find((el) => {
      if (el.id === clickId) {
        setStock(el.stock);
      }
    });
  }, [cartItems, clickId]);

  useEffect(() => {
    onChangeQty(inputValue);
  }, [inputValue, onChangeQty]);

  useEffect(() => {
    if (onResetInput) {
      setInputValue('1');
    }
  }, [onResetInput]);

  function handelArrowAppClick() {
    if (+inputValue < stock) {
      setInputValue((el) => (+el + 1).toString());
    }
  }

  function handelArrowDownClick() {
    if (+inputValue > 1) {
      setInputValue((el) => (+el - 1).toString());
    } else {
      setInputValue('1');
    }
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;
    if (+value < 0) {
      setInputValue('1');
    } else if (+value >= stock) {
      setInputValue(stock.toString());
    } else {
      setInputValue(e.target.value);
    }
  }

  return (
    <div className="cart-item__qty">
      <div className="cart-item-qty__value-container">
        <input
          className="cart-item-qty__value-container quantity-input"
          type="number"
          value={inputValue}
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
