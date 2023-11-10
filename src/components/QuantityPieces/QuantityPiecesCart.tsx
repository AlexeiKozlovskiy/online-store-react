import { useEffect, useState } from 'react';
import {
  addProductsToCart,
  removeProductsFromCart,
  setProductsQuantityInCart,
} from '@/reducers/controller';
import { QuantityPieces } from './QuantityPieces';
import { useGetProductsQuery } from '@/api/ProductsAPI';

interface IQuantity {
  id: string;
  quantity: number;
  stock: number;
}

export function QuantityPiecesCart({ id, quantity, stock }: IQuantity) {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    if (quantity >= 1) {
      setInputValue(quantity.toString());
    }
  }, [quantity]);

  function handelArrowAppClick() {
    addProductsToCart(id, products!);
  }

  function handelArrowDownClick() {
    removeProductsFromCart(id, products!);
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;

    if (+value < 0) {
      setInputValue('1');
      addProductsToCart(id, products!);
    } else if (+value >= stock) {
      setInputValue(stock.toString());
      setProductsQuantityInCart(id, stock, products!);
    } else {
      setInputValue(value);
      setProductsQuantityInCart(id, +value, products!);
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
