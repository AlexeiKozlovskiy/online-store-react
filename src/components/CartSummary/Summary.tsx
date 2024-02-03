import '@/pages/CartPage/CartPage.scss';
import { useRef, useState } from 'react';
import { Authentication, PromocodeData, RootReducerProps } from '@/types/types';
import { PROMOCODES } from '@/helpers/constant';
import { useSelector } from 'react-redux';
import { isPromocodeAvailable, applyPromocode, removePromocode } from '@/store/controller';
import { formatPrice } from '@/helpers/helpersFunc';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useTotalCartInfo } from '@/hooks/TotalCartInfo';

export function Summary() {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<string | null>(null);
  const { setOpenModals } = useCloseOpenModalsContext();
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const promocodeState = useSelector<RootReducerProps, PromocodeData>((state) => state.promocode);
  const { totalItems, totalPrice, totalPriseByPromocode } = useTotalCartInfo();

  function handelClickBTN() {
    setInputValue('');
    applyPromocode(inputRef.current!);
  }

  function handelClickPromoCode(name: string) {
    setInputValue(name);
    inputRef.current = name;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    inputRef.current = e.target.value;
  }

  function checkAuth() {
    if (!authenticated) {
      setOpenModals((prevOpenModals) => ({
        ...prevOpenModals,
        modalSignIN: true,
      }));
    } else {
      setOpenModals((prevOpenModals) => ({
        ...prevOpenModals,
        modalPayment: true,
      }));
    }
  }

  return (
    <aside className="shopping-cart__summary">
      <div className="summery-info">
        <h3 className="summery-info__header">SUMMARY</h3>
        <div className="summery-info__order-container">
          <div className="order-container__content">
            <div className="order-container__items-count items-count">
              <div className="items-count__title">Items Total</div>
              <div className="items-count__count">{totalItems}</div>
            </div>
            <div className="order-container__total-count total-count">
              <div className="total-count__text">Order Total</div>
              <div
                className={`total-count__total-value ${
                  promocodeState.applied.length ? 'discount' : ''
                }`}
              >
                ${totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="order-container__promocode promocode-order">
            <div className="promocode-order__list">
              {promocodeState.applied.map(({ id, name, discount }) => {
                return (
                  <div key={id} className="promocode-order__item">
                    <div className="promocode-order__name">
                      {name}-{discount}% OFF
                      <br></br>($-{formatPrice(totalPrice * (discount / 100))})
                    </div>
                    <ButtonCross
                      onClickCross={() => removePromocode(id)}
                      adittionClassName="summary-cross"
                    />
                  </div>
                );
              })}
            </div>
            <div className="promocode-order__total-value">
              {promocodeState.applied.length ? `$${formatPrice(totalPriseByPromocode)}` : ''}
            </div>
          </div>
          <div className="order-container-button">
            <button className="button-order" onClick={checkAuth} data-testid="button-order">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <div className="shopping-promo">
        <div className="shopping-promo__container">
          <input
            className="input-promo"
            type="text"
            placeholder="Enter promo code"
            onChange={handleChange}
            value={inputValue}
          />
          <button
            className="button-apply"
            onClick={handelClickBTN}
            disabled={isPromocodeAvailable(inputRef.current!) ? false : true}
          >
            Apply
          </button>
        </div>
        <div className="promo-test">
          Promo for test:{' '}
          {PROMOCODES.map(({ name, id }) => (
            <span key={id}>
              <div
                data-testid={name}
                className="promo-test__name"
                onClick={() => handelClickPromoCode(name)}
              >
                {name}
              </div>{' '}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
