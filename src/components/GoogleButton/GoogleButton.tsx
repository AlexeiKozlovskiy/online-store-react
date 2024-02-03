import './GoogleButton.scss';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { jwtDecode } from 'jwt-decode';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { useEffect } from 'react';
import { CredentialGoogle, GoogleResp } from '@/types/types';
import { MODAL_WINDOWS } from '@/helpers/constant';

export function GoogleButton() {
  const { openModals, closeAnimationModal } = useCloseOpenModalsContext();
  const { setGoogleData } = useMyUserAuthContext();

  const { modalSignIN, modalSignUP } = openModals;
  const { SIGN_UP, SIGN_IN } = MODAL_WINDOWS;

  function hadelCallbackResponse(response: GoogleResp) {
    const googleData = jwtDecode<CredentialGoogle>(response.credential);
    setGoogleData(googleData);
    modalSignIN && closeAnimationModal(SIGN_IN);
    modalSignUP && closeAnimationModal(SIGN_UP);
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
  }, [modalSignUP, modalSignIN]);

  return <button data-testid="google-btn" className="google-btn" id="signInDiv"></button>;
}
