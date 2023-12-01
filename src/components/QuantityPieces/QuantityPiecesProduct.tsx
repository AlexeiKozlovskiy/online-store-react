import { useEffect, useState } from 'react';
import { QuantityPieces } from './QuantityPieces';

interface IQuantity {
  onChangeQuantity: (value: string) => void;
  onResetInput: boolean;
  stock: number;
}

export function QuantityPiecesProduct({ onChangeQuantity, onResetInput, stock }: IQuantity) {
  const [inputValue, setInputValue] = useState(1);

  useEffect(() => {
    onChangeQuantity(inputValue.toString());
  }, [inputValue, onChangeQuantity]);

  useEffect(() => {
    onResetInput && setInputValue(1);
  }, [onResetInput]);

  function handelArrowAppClick() {
    if (stock && inputValue < stock) {
      console.log(stock);

      setInputValue((el) => el + 1);
    }
  }

  function handelArrowDownClick() {
    if (inputValue > 1) {
      setInputValue((el) => el - 1);
    } else {
      setInputValue(1);
    }
  }

  function handelInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target as HTMLInputElement;
    if (+value < 0) {
      setInputValue(1);
    } else if (+value >= stock) {
      setInputValue(stock);
    } else {
      setInputValue(+e.target.value);
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
