import './QuantityPieces.scss';

interface IQuantityPieces {
  inputValue: string;
  handelInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handelArrowAppClick: (event: React.MouseEvent) => void;
  handelArrowDownClick: (event: React.MouseEvent) => void;
}

export function QuantityPieces({
  inputValue,
  handelInput,
  handelArrowDownClick,
  handelArrowAppClick,
}: IQuantityPieces) {
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
