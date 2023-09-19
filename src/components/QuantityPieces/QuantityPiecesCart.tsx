import { useEffect, useState } from 'react';
import {
  addProductsToCart,
  removeProductsFromCart,
  setProductsQuantityInCart,
} from '@/components/reducers/controller';
import { QuantityPieces } from './QuantityPieces';

interface IQuantity {
  id: number;
  quantity: number;
  stock: number;
}

export function QuantityPiecesCart({ id, quantity, stock }: IQuantity) {
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    if (quantity >= 1) {
      setInputValue(quantity.toString());
    }
  }, [quantity]);

  function handelArrowAppClick() {
    addProductsToCart(id);
  }

  function handelArrowDownClick() {
    removeProductsFromCart(id);
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (+value < 0) {
      setInputValue('1');
      addProductsToCart(id);
    } else if (+value >= stock) {
      setInputValue(stock.toString());
      setProductsQuantityInCart(id, stock);
    } else {
      setInputValue(value);
      setProductsQuantityInCart(id, +value);
    }
  }

  return (
    <QuantityPieces
      inputValue={inputValue}
      handelInput={handelInput}
      handelArrowAppClick={handelArrowAppClick}
      handelArrowDownClick={handelArrowDownClick}
    />
  );
}
