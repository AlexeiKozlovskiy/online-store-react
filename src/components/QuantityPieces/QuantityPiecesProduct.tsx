import { useEffect, useState } from 'react';
import { QuantityPieces } from './QuantityPieces';

interface IQuantity {
  onChangeQuantity: (value: string) => void;
  onResetInput: boolean;
  stock: number;
}

export function QuantityPiecesProduct({ onChangeQuantity, onResetInput, stock }: IQuantity) {
  const [inputValue, setInputValue] = useState('1');

  useEffect(() => {
    onChangeQuantity(inputValue.toString());
  }, [inputValue]);

  useEffect(() => {
    onResetInput && setInputValue('1');
  }, [onResetInput]);

  function handelArrowAppClick() {
    if (inputValue && stock && +inputValue < stock) {
      setInputValue((el) => (+el + 1).toString());
    }
  }

  function handelArrowDownClick() {
    if (inputValue && +inputValue > 1) {
      setInputValue((el) => (+el - 1).toString());
    } else {
      setInputValue('1');
    }
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;
    if (value.match(/[^0-9]/g)) {
      setInputValue('1');
    } else if (+value >= stock) {
      setInputValue(stock.toString());
    } else {
      setInputValue(value);
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
