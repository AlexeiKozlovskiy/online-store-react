import './Header.scss';
import './HeaderAuth.scss';
import { Link } from 'react-router-dom';
import { useMyRemoveFiltSortContext } from '@/context/RemoveAllSelectedContext';
import { useMyURLContext } from '@/context/URLContext';
import { useMyTotalPriceContext } from '@/context/TotalPriseContext';
import { useMyTotalItemsContext } from '@/context/TotalItemsContext';
import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { SignUPModal } from '@/components/ModalWindow/SignUP/SignUPModal';
import { SignINModal } from '@/components/ModalWindow/SignIN/SignINModal';
import { UserIcon } from '@/components/UserProfile/UserIcon';
import { UserModal } from '@/components/ModalWindow/User/UserModal';
import { useMyUserContext } from '@/context/UserContext';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { Preloader } from '@/components/Preloader/Preloader';
import { useSelector } from 'react-redux';
import { Authentication, RootReducerProps } from '@/types/types';
import { useState } from 'react';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

export function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const { cartUrl } = useMyURLContext();
  const { removeAllSelected } = useMyRemoveFiltSortContext();
  const { totalPriceByPromocodes } = useMyTotalPriceContext();
  const { totalItems } = useMyTotalItemsContext();
  const {
    handelCloseModalSignUP,
    handelCloseModalSignIN,
    handelCloseModalUser,
    closeModalUserAnimation,
    openModals,
    setOpenModals,
  } = useCloseOpenModalsContext();
  const { authenticated, isFetching } = useMyUserContext();
  const { idUser } = useSelector<RootReducerProps, Authentication>((state) => state.auth);

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
      <div className="header-auth__btn" onClick={getSignIN}>
        Sign In
      </div>
      <div className="header-auth-signup">
        <div className="header-auth__text">Not a Member?</div>
        <div className="header-auth__link" onClick={getSignUP}>
          Sign up
        </div>
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
        <Link to="/" className="header-link" onClick={removeAllSelected}>
          <HeaderLogo />
        </Link>
        <div className="header-nav" data-show={showBurgerMenu}>
          <ButtonCross onClickCross={handleShowBurgerMenu} adittionClassName="close-burger-cross" />
          <Link to="/" className="header-link" onClick={logoClikBurger}>
            <HeaderLogo />
          </Link>
          <div className="header-nav-contents">
            {isFetching ? <Preloader /> : authenticated && userIcon}
            {!idUser && !isFetching && authBar}
          </div>
          <Link to={cartUrl} className="header-cart" onClick={() => setShowBurgerMenu(false)}>
            <div className="header-cart__img"></div>
            <div className="header-cart__amount-container">
              <p className="header-cart__amount">{totalItems}</p>
            </div>
            <div className="header-cart__num">${totalPriceByPromocodes.toFixed(2)}</div>
          </Link>
        </div>
        <div className="header-nav__icon" onClick={handleShowBurgerMenu}></div>
      </div>
    </header>
  );
}
