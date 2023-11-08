import './GoogleButton.scss';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { jwtDecode } from 'jwt-decode';
import { useMyUserContext } from '@/context/UserContext';
import { useEffect } from 'react';
import { DataFromGoogle, GoogleResponse } from '@/types/types';

export function GoogleButton() {
  const { openModalSignUP, openModalSignIN, closeModalSignInAnimation, closeModalSignUPAnimation } =
    useCloseOpenModalsContext();
  const { setGoogleData } = useMyUserContext();

  function hadelCallbackResponse(response: GoogleResponse) {
    const googleData = jwtDecode<DataFromGoogle>(response.credential);
    setGoogleData(googleData);
    openModalSignUP && closeModalSignUPAnimation();
    openModalSignIN && closeModalSignInAnimation();
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: hadelCallbackResponse,
    });
    window.google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      locale: 'EN',
      width: '400',
    });
  }, [openModalSignIN, openModalSignUP]);

  return (
    <>
      <div className="google-btn" id="signInDiv"></div>
    </>
  );
}
