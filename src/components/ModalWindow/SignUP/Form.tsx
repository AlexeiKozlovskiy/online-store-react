import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { useForm } from 'react-hook-form';
import { MyForms } from '@/types/types';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsInputsHelper } from '@/hooks/FormsInputsHelperHook';
import { useMyUserAuthContext } from '@/context/UserAuthContext';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';
import { FormInput } from '@/components/FormInput/FormInput';
import { useFormsValidation } from '@/hooks/FormsValidationHook';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';

export function Form() {
  const { getSignUP, showPreloader, errorUser } = useMyUserAuthContext();
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
  const { setOpenModals } = useCloseOpenModalsContext();

  const { formSignUP } = errors;
  const { login, password, email } = formSignUP || {};
  const errorsLogin = login?.type;
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = ({ formSignUP }: MyForms) => {
    getSignUP(formSignUP);
    reset({ formSignUP: { password: '' } });
  };

  function getSignIN() {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      modalSignIN: true,
      modalSignUP: false,
    }));
  }

  const ErrorSignUP = <div className="form-error-response">{errorUser}</div>;

  return (
    <>
      <form className="signUP-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signUP-details">
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
              name={watch('formSignUP.login') && 'Login'}
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
              name={watch('formSignUP.email') && 'Email'}
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
              name={watch('formSignUP.password') && 'Password'}
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
            <span className="signUP-already__highlight" onClick={getSignIN}>
              Log In
            </span>
          </div>
          {showPreloader && <Preloader />}
          {errorUser && ErrorSignUP}
        </div>
      </form>
    </>
  );
}
