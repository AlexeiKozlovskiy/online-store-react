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
import { Preloader } from '@/components//Preloader/Preloader';
import { useSelector } from 'react-redux';
import { Authentication, RootReducerProps } from '@/types/types';
import { memo, useState } from 'react';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

export const Header = memo(function Header() {
  const { curPageCart, perCartPageOption } = useMyURLContext();
  const { removeAllSelected } = useMyRemoveFiltSortContext();
  const { totalPriceByPromocodes } = useMyTotalPriceContext();
  const { totalItems } = useMyTotalItemsContext();
  const {
    openModalSignUP,
    setOpenModalSignUP,
    openModalSignIN,
    setOpenModalSignIN,
    openModalUser,
    setOpenModalUser,
    handelCloseModalSignUP,
    handelCloseModalSignIN,
    handelCloseModalUser,
    closeModalUserAnimation,
  } = useCloseOpenModalsContext();
  const { authenticated, isFetching } = useMyUserContext();
  const { idUser } = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  function handleShowBurgerMenu() {
    showBurgerMenu ? setShowBurgerMenu(false) : setShowBurgerMenu(true);
  }

  function getSignIN() {
    setOpenModalSignIN(true);
    setShowBurgerMenu(false);
  }

  function getSignUP() {
    setOpenModalSignUP(true);
    setShowBurgerMenu(false);
  }

  function logoClikBurger() {
    removeAllSelected();
    setShowBurgerMenu(false);
  }

  function getCartUrl() {
    let url = `/cart`;
    if (+perCartPageOption.value !== 3) {
      url = `/cart?page=${curPageCart}&perPage=${perCartPageOption.value}`;
    }
    return url;
  }

  const userIcon = <UserIcon handleClick={() => setOpenModalUser(true)} />;

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
      {openModalSignUP && <SignUPModal handelCloseModalSignUP={handelCloseModalSignUP} />}
      {openModalSignIN && <SignINModal handelCloseModalSignIN={handelCloseModalSignIN} />}
      {openModalUser && (
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
          <ButtonCross onClickCross={handleShowBurgerMenu} />
          <Link to="/" className="header-link" onClick={logoClikBurger}>
            <HeaderLogo />
          </Link>
          <div className="header-nav-contents">
            {isFetching ? <Preloader /> : authenticated && userIcon}
            {!idUser && !isFetching && authBar}
          </div>
          <Link to={getCartUrl()} className="header-cart" onClick={() => setShowBurgerMenu(false)}>
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
});
