import './QuantityPieces.scss';

export function QuantityPieces() {
  return (
    <div className="cart-item__qty">
      <div className="cart-item-qty__value-container">
        <input
          className="cart-item-qty__value-container quantity-input"
          data-stock={1}
          type="number"
          defaultValue={1}
        />
      </div>
      <div className="cart-item-qty__arrow-container arrow-up">
        <div className="cart-item-qty__arrow-up"></div>
      </div>
      <div className="cart-item-qty__arrow-container arrow-down">
        <div className="cart-item-qty__arrow-down"></div>
      </div>
    </div>
  );
}
