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
    <div className="amount-item">
      <div className="amount-item__value-container">
        <input
          className="amount-item__value-container amount-input"
          type="text"
          value={inputValue}
          onChange={handelInput}
          maxLength={3}
        />
      </div>
      <div className="amount-item__arrow-container arrow-up" onClick={handelArrowAppClick}>
        <div className="amount-item__arrow-up"></div>
      </div>
      <div className="amount-item__arrow-container arrow-down" onClick={handelArrowDownClick}>
        <div className="amount-item__arrow-down"></div>
      </div>
    </div>
  );
}
