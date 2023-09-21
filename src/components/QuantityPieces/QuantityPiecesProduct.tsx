import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/components/types/types';
import products from '@/assets/data/products.json';
import { QuantityPieces } from './QuantityPieces';

interface IQuantity {
  id: number;
  onChangeQuantity: (value: string) => void;
  onResetInput: boolean;
}

export function QuantityPiecesProduct({ onChangeQuantity, onResetInput, id }: IQuantity) {
  const [inputValue, setInputValue] = useState('1');
  const [stock, setStock] = useState(0);
  const cartItems = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];

  useEffect(() => {
    products.find((el) => {
      if (el.id === id) {
        setStock(el.stock);
      }
    });
  }, [cartItems, id]);

  useEffect(() => {
    onChangeQuantity(inputValue);
  }, [inputValue, onChangeQuantity]);

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
    <QuantityPieces
      inputValue={inputValue}
      handelInput={handelInput}
      handelArrowAppClick={handelArrowAppClick}
      handelArrowDownClick={handelArrowDownClick}
    />
  );
}
