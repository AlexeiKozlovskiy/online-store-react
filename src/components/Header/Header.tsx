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
import { Preloader } from '../Preloader/Preloader';

export function Header() {
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
  const { authenticated, isFetching, idUser } = useMyUserContext();

  function getCartUrl() {
    let url = `/cart`;
    if (+perCartPageOption.value !== 3) {
      url = `/cart?page=${curPageCart}&perPage=${perCartPageOption.value}`;
    }
    return url;
  }

  const userIcon = (
    <>
      <UserIcon handleClick={() => setOpenModalUser(true)} />
    </>
  );

  const authBar = (
    <>
      <div className="header-auth__btn" onClick={() => setOpenModalSignIN(true)}>
        Sign In
      </div>
      <div className="header-auth-signup">
        <div className="header-auth__text">Not a Member?</div>
        <div className="header-auth__link" onClick={() => setOpenModalSignUP(true)}>
          Sign up
        </div>
      </div>
    </>
  );

  return (
    <header className="header">
      {openModalSignUP && <SignUPModal handelCloseModalSignUP={handelCloseModalSignUP} />}
      {openModalSignIN && <SignINModal handelCloseModalSignIN={handelCloseModalSignIN} />}
      {openModalUser && (
        <UserModal
          onClickOutside={handelCloseModalUser}
          closeModalUserAnimation={closeModalUserAnimation}
        />
      )}
      <div className="header__container wrapper">
        <Link to="/" className="header-link" onClick={removeAllSelected}>
          <HeaderLogo />
        </Link>
        <div className="header-nav">
          <div className="header-nav-contents">
            {isFetching ? <Preloader /> : authenticated && userIcon}
            {!idUser && authBar}
          </div>
          <Link to={getCartUrl()} className="header-cart">
            <div className="header-cart__img"></div>
            <div className="header-cart__amount-container">
              <p className="header-cart__amount">{totalItems}</p>
            </div>
            <div className="header-cart__num">${totalPriceByPromocodes.toFixed(2)}</div>
          </Link>
        </div>
      </div>
    </header>
  );
}
