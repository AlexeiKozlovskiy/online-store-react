import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/types/types';
import { QuantityPieces } from './QuantityPieces';
import { useGetProductsQuery } from '@/api/productsAPI';

interface IQuantity {
  clickId: string;
  onChangeQuantity: (value: string) => void;
  onResetInput: boolean;
}

export function QuantityPiecesProduct({ onChangeQuantity, onResetInput, clickId }: IQuantity) {
  const { data: products = [] } = useGetProductsQuery();
  const [inputValue, setInputValue] = useState('1');
  const [stock, setStock] = useState(0);

  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];

  useEffect(() => {
    products.find(({ id, stock }) => {
      if (id === clickId) {
        setStock(stock);
      }
    });
  }, [cartItemsState, clickId]);

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
