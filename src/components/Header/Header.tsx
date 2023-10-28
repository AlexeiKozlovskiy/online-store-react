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
import { useCloseModalsHook } from '@/components/CustomHook/CloseModalsHook';

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
  } = useCloseModalsHook();

  function getCartUrl() {
    let url = `/cart`;
    if (+perCartPageOption.value !== 3) {
      url = `/cart?page=${curPageCart}&perPage=${perCartPageOption.value}`;
    }
    return url;
  }

  return (
    <header className="header">
      <div className="header__container wrapper">
        <Link to="/" className="header-link" onClick={removeAllSelected}>
          <HeaderLogo />
        </Link>
        <div className="header-nav">
          <div className="header-nav-contents">
            {openModalSignUP && (
              <SignUPModal
                setOpenModalSignUP={setOpenModalSignUP}
                handelCloseModalSignUP={handelCloseModalSignUP}
              />
            )}
            {openModalSignIN && (
              <SignINModal
                setOpenModalSignIN={setOpenModalSignIN}
                handelCloseModalSignIN={handelCloseModalSignIN}
              />
            )}
            <div className="header-auth__btn" onClick={() => setOpenModalSignIN(true)}>
              Sign In
            </div>
            <div className="header-auth-signup">
              <div className="header-auth__text">Not a Member?</div>
              <div className="header-auth__link" onClick={() => setOpenModalSignUP(true)}>
                Sign up
              </div>
            </div>
            <UserIcon handleClick={() => setOpenModalUser(true)} />
            {openModalUser && <UserModal onClickOutside={handelCloseModalUser} />}
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
