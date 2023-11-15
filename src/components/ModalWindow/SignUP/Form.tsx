import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { useForm } from 'react-hook-form';
import { MyForms } from '@/types/types';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';
import { useMyUserContext } from '@/context/UserContext';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';
import { FormInput } from '@/components/FormInput/FormInput';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';

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
  } = useForm<MyForms>({
    defaultValues: {
      formSignUP: {
        login: '',
        email: '',
        password: '',
      },
    },
  });
  useFormsInputsHelper({ watch, setValue });
  const { validateLogin, validateEmail, validatePassword, errorDefinitions } = useFormsValidation();

  const { formSignUP } = errors;
  const { login, password, email } = formSignUP || {};
  const errorsLogin = login?.type;
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = (formSignUP: MyForms) => {
    signUP(formSignUP);
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
            <FormInput
              id="loginInputSignUP"
              type="text"
              placeholder="Login"
              register={register}
              registerType="formSignUP.login"
              isValid={isValid}
              validate={validateLogin}
              errors={errorsLogin}
              errorDefinitions={errorDefinitions.login}
            />
            <FormInput
              id="emailInputSignUP"
              type="text"
              placeholder="Email"
              register={register}
              registerType="formSignUP.email"
              isValid={isValid}
              validate={validateEmail}
              errors={errorsEmail}
              errorDefinitions={errorDefinitions.email}
            />
            <FormInput
              id="paswordInputSignUP"
              type="password"
              placeholder="Password"
              register={register}
              registerType="formSignUP.password"
              isValid={isValid}
              validate={validatePassword}
              errors={errorsPassword}
              errorDefinitions={errorDefinitions.password}
            />
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
