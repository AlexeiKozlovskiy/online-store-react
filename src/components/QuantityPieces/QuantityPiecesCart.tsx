import { useEffect, useState } from 'react';
import {
  addProductToCart,
  removeProductFromCart,
  setProductsQuantityInCart,
} from '@/store/controller';
import { QuantityPieces } from './QuantityPieces';
import { useGetProductsQuery } from '@/api/ProductsAPI';

interface IQuantity {
  id: string;
  quantity: number;
  stock: number;
}

export function QuantityPiecesCart({ id, quantity, stock }: IQuantity) {
  const [inputValue, setInputValue] = useState(quantity);
  const { data: products } = useGetProductsQuery('');

  useEffect(() => {
    if (quantity >= 1) {
      setInputValue(quantity);
    }
  }, [quantity]);

  function handelArrowAppClick() {
    addProductToCart(id, products!);
  }

  function handelArrowDownClick() {
    removeProductFromCart(id);
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (+value < 0) {
      setInputValue(1);
      addProductToCart(id, products!);
    } else if (+value >= stock) {
      setInputValue(stock);
      setProductsQuantityInCart(id, stock, products!);
    } else {
      setInputValue(+value);
      setProductsQuantityInCart(id, +value, products!);
    }
  }

  return (
    <QuantityPieces
      inputValue={inputValue.toString()}
      handelInput={handelInput}
      handelArrowAppClick={handelArrowAppClick}
      handelArrowDownClick={handelArrowDownClick}
    />
  );
}
