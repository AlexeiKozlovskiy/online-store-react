import './Header.scss';
import './HeaderAuth.scss';
import { Link } from 'react-router-dom';
import { useMyURLContext } from '@/context/URLContext';
import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { SignUPModal } from '@/components/ModalWindow/SignUP/SignUPModal';
import { SignINModal } from '@/components/ModalWindow/SignIN/SignINModal';
import { UserIcon } from '@/components/UserProfile/UserIcon';
import { UserModal } from '@/components/ModalWindow/User/UserModal';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { Preloader } from '@/components/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { Authentication, ROUTE, RootReducerProps } from '@/types/types';
import { useState } from 'react';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';
import { useTotalCartInfo } from '@/hooks/TotalCartInfo';
import { bodyNotScroll } from '@/helpers/helpersFunc';

export function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const { cartUrl, removeAllSelected } = useMyURLContext();
  const { handelCloseModal, closeAnimationModal, openModals, setOpenModals } =
    useCloseOpenModalsContext();
  const { isFetching } = useMyUserAuthContext();
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { totalItems, totalPriseByPromocode } = useTotalCartInfo();

  const { modalSignUP, modalSignIN, modalUser } = openModals;

  function handleShowBurgerMenu() {
    setShowBurgerMenu((prevShowBurgerMenu) => !prevShowBurgerMenu);
    bodyNotScroll();
  }

  function modalsUdater(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    const key = dataset.id!;
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [key]: true,
    }));
    setShowBurgerMenu(false);
  }

  function logoClickBurger() {
    removeAllSelected();
    setShowBurgerMenu(false);
  }

  const userIcon = <UserIcon handleClick={modalsUdater} />;
  const authBar = (
    <>
      <button className="header-auth__btn-sign-in" data-id="modalSignIN" onClick={modalsUdater}>
        Sign In
      </button>
      <div className="header-auth-signup">
        <p className="header-auth__text">Not a Member?</p>
        <button className="header-auth__btn-sign-up" data-id="modalSignUP" onClick={modalsUdater}>
          Sign up
        </button>
      </div>
    </>
  );

  return (
    <header data-testid="header" className="header wrapper">
      {modalSignUP && <SignUPModal handelCloseModal={handelCloseModal} />}
      {modalSignIN && <SignINModal handelCloseModal={handelCloseModal} />}
      {modalUser && (
        <UserModal handelCloseModal={handelCloseModal} closeAnimationModal={closeAnimationModal} />
      )}
      <div className="header__container">
        <Link to={ROUTE.MAIN} className="header-link" onClick={removeAllSelected}>
          <HeaderLogo />
        </Link>
        <div className="header-nav" data-show={showBurgerMenu}>
          <ButtonCross onClickCross={handleShowBurgerMenu} adittionClassName="close-burger-cross" />
          <Link to={ROUTE.MAIN} className="header-link" onClick={logoClickBurger}>
            <HeaderLogo />
          </Link>
          <div className="header-nav-contents">
            {isFetching ? <Preloader /> : authenticated && userIcon}
            {!authenticated && !isFetching && authBar}
          </div>
          <Link to={cartUrl} className="header-cart" onClick={() => setShowBurgerMenu(false)}>
            <div className="header-cart__img"></div>
            <div className="header-cart__amount-container">
              <p className="header-cart__amount">{totalItems}</p>
            </div>
            <div className="header-cart__num">${totalPriseByPromocode.toFixed(2)}</div>
          </Link>
        </div>
        <div className="header-nav__icon" onClick={handleShowBurgerMenu}></div>
      </div>
    </header>
  );
}
