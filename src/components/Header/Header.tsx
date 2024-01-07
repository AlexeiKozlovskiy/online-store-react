import './Header.scss';
import './HeaderAuth.scss';
import { Link } from 'react-router-dom';
import { useMyRemoveFiltSortContext } from '@/context/RemoveAllSelectedContext';
import { useMyURLContext } from '@/context/URLContext';
import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { SignUPModal } from '@/components/ModalWindow/SignUP/SignUPModal';
import { SignINModal } from '@/components/ModalWindow/SignIN/SignINModal';
import { UserIcon } from '@/components/UserProfile/UserIcon';
import { UserModal } from '@/components/ModalWindow/User/UserModal';
import { useMyUserContext } from '@/context/UserContext';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { Preloader } from '@/components/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { Authentication, ROUTE, RootReducerProps } from '@/types/types';
import { useState } from 'react';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';
import { useTotalCartInfo } from '@/hooks/TotalCartInfo';

export function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const { cartUrl } = useMyURLContext();
  const { removeAllSelected } = useMyRemoveFiltSortContext();
  const {
    handelCloseModalSignUP,
    handelCloseModalSignIN,
    handelCloseModalUser,
    closeModalUserAnimation,
    openModals,
    setOpenModals,
  } = useCloseOpenModalsContext();
  const { isFetching } = useMyUserContext();
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { totalItems, totalPriseByPromocode } = useTotalCartInfo();

  const { signUP, signIN, user } = openModals;

  function handleShowBurgerMenu() {
    showBurgerMenu ? setShowBurgerMenu(false) : setShowBurgerMenu(true);
  }

  function getSignIN() {
    setOpenModals({ ...openModals, signIN: true });
    setShowBurgerMenu(false);
  }

  function getSignUP() {
    setOpenModals({ ...openModals, signUP: true });
    setShowBurgerMenu(false);
  }

  function logoClikBurger() {
    removeAllSelected();
    setShowBurgerMenu(false);
  }

  const userIcon = <UserIcon handleClick={() => setOpenModals({ ...openModals, user: true })} />;
  const authBar = (
    <>
      <button className="header-auth__btn-sign-in" onClick={getSignIN}>
        Sign In
      </button>
      <div className="header-auth-signup">
        <p className="header-auth__text">Not a Member?</p>
        <button className="header-auth__btn-sign-up" onClick={getSignUP}>
          Sign up
        </button>
      </div>
    </>
  );

  return (
    <header className="header wrapper">
      {signUP && <SignUPModal handelCloseModalSignUP={handelCloseModalSignUP} />}
      {signIN && <SignINModal handelCloseModalSignIN={handelCloseModalSignIN} />}
      {user && (
        <UserModal
          onClickOutside={handelCloseModalUser}
          closeModalUserAnimation={closeModalUserAnimation}
        />
      )}
      <div className="header__container">
        <Link to={ROUTE.MAIN} className="header-link" onClick={removeAllSelected}>
          <HeaderLogo />
        </Link>
        <div className="header-nav" data-show={showBurgerMenu}>
          <ButtonCross onClickCross={handleShowBurgerMenu} adittionClassName="close-burger-cross" />
          <Link to={ROUTE.MAIN} className="header-link" onClick={logoClikBurger}>
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
