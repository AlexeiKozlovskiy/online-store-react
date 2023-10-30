import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';
import { FormDataSignIN } from '@/types/types';

interface IForm {
  setOpenModalSignIN: (value: boolean) => void;
  handelCloseModalSignIN: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Form({ setOpenModalSignIN, handelCloseModalSignIN }: IForm) {
  const [submitSignUPData, setSubmitSignUPData] = useState({});
  const [showPreloader, setShowPreloader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormDataSignIN>({
    defaultValues: {
      formSignIN: {
        email: '',
        password: '',
      },
    },
  });
  const { validateEmail, validatePassword, errorDefinitions } = useFormsValidation();
  useFormsInputsHelper({ watch, setValue });
  const { formSignIN } = errors;
  const { password, email } = formSignIN || {};
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = ({ formSignIN }: FormDataSignIN) => {
    const { email, password } = formSignIN;
    setShowPreloader(true);
    setSubmitSignUPData({
      formDataSighIN: {
        email,
        password,
      },
    });
    setTimeout(() => {
      reset();
      setOpenModalSignIN(false);
      setShowPreloader(false);
    }, 2000);
  };

  useEffect(() => {
    if (Object.keys(submitSignUPData).length !== 0) {
      console.log('submitSignUPData', submitSignUPData);
    }
  }, [submitSignUPData]);

  return (
    <>
      <form className="signIN-form animation-view-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signIN-details">
          <div
            className="modal__close-btn"
            data-id="close-modal-signIN"
            onClick={() => handelCloseModalSignIN}
          ></div>
          <div className="signIN-details__title">SIGN IN</div>
          <div className="signIN-details__logo">
            <HeaderLogo />
          </div>
          <div className="signIN-details__info">
            <button className="main-modal-btn-google">Log in with Google</button>
            <p className="signIN__hr">Or</p>
            <div>
              <input
                placeholder="Email"
                className={`signIN-details__email ${errorsEmail && 'invalid'} ${
                  isValid && 'valid'
                }`}
                type="text"
                id="emailInputSignIN"
                {...register('formSignIN.email', {
                  required: true,
                  validate: validateEmail,
                })}
              />
              {errorsEmail && errorDefinitions.email[errorsEmail]}
            </div>
            <div>
              <input
                placeholder="Password"
                className={`signIN-details__pasword ${errorsPassword && 'invalid'} ${
                  isValid && 'valid'
                }`}
                type="password"
                id="paswordInputSignIN"
                {...register('formSignIN.password', {
                  required: true,
                  validate: validatePassword,
                })}
              />
              {errorsPassword && errorDefinitions.password[errorsPassword]}
            </div>
          </div>
          <div className="signIN__forgot">
            <span>Forgot password?</span>
          </div>
          <button className="main-modal-btn">Log In</button>
          <div className="signIN-already">
            <span>{`Don't have an account?`}</span>
            <span className="signIN-already__highlight">Sign up</span>
          </div>
          {showPreloader && <Preloader />}
        </div>
      </form>
    </>
  );
}
