import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { useForm } from 'react-hook-form';
import { FormDataSignUP } from '@/types/types';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';
import { useMyUserContext } from '@/context/UserContext';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';

interface IForm {
  handelCloseModalSignUP: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Form({ handelCloseModalSignUP }: IForm) {
  const { signUP, showPreloader, errorUser } = useMyUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm<FormDataSignUP>({
    defaultValues: {
      formSignUP: {
        login: '',
        email: '',
        password: '',
      },
    },
  });
  const { validateLogin, validateEmail, validatePassword, errorDefinitions } = useFormsValidation();
  useFormsInputsHelper({ watch, setValue });
  const { formSignUP } = errors;
  const { login, password, email } = formSignUP || {};
  const errorsLogin = login?.type;
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = ({ formSignUP }: FormDataSignUP) => {
    signUP({ formSignUP });
    reset({ formSignUP: { password: '' } });
  };

  const ErrorSignUP = <div className="form-error-response">{errorUser}</div>;

  return (
    <>
      <form className="signUP-form animation-view-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signUP-details">
          <div
            className="modal__close-btn"
            data-id="close-modal-signUP"
            onClick={() => handelCloseModalSignUP}
          ></div>
          <div className="signUP-details__title">SIGN UP</div>
          <div className="signIN-details__logo">
            <HeaderLogo />
          </div>
          <div className="signUP-details__info">
            <GoogleButton />
            <p className="hr">Or</p>
            <div>
              <input
                placeholder="Login"
                className={`signUP-details__name ${errorsLogin && 'invalid'} ${isValid && 'valid'}`}
                type="text"
                id="loginInputSignUP"
                {...register('formSignUP.login', {
                  required: true,
                  validate: validateLogin,
                })}
              />
              {errorsLogin && errorDefinitions.login[errorsLogin]}
            </div>
            <div>
              <input
                placeholder="Email"
                className={`signUP-details__email ${errorsEmail && 'invalid'} ${
                  isValid && 'valid'
                }`}
                type="text"
                id="emailInputSignUP"
                {...register('formSignUP.email', {
                  required: true,
                  validate: validateEmail,
                })}
              />
              {errorsEmail && errorDefinitions.email[errorsEmail]}
            </div>
            <div>
              <input
                placeholder="Password"
                className={`signUP-details__pasword ${errorsPassword && 'invalid'} ${
                  isValid && 'valid'
                }`}
                type="password"
                id="paswordInputSignUP"
                {...register('formSignUP.password', {
                  required: true,
                  validate: validatePassword,
                })}
              />
              {errorsPassword && errorDefinitions.password[errorsPassword]}
            </div>
          </div>
          <button className="main-modal-btn">Get started now</button>
          <div className="signUP-already">
            <span>Already a user?</span>
            <span className="signUP-already__highlight">Log In</span>
          </div>
          {showPreloader && <Preloader />}
          {errorUser && ErrorSignUP}
        </div>
      </form>
    </>
  );
}
