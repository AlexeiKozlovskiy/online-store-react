import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { useForm } from 'react-hook-form';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';
import { MyForms } from '@/types/types';
import { useMyUserContext } from '@/context/UserContext';
import { GoogleButton } from '@/components/GoogleButton/GoogleButton';
import { FormInput } from '@/components/FormInput/FormInput';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';

interface IForm {
  handelCloseModalSignIN: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Form({ handelCloseModalSignIN }: IForm) {
  const { signIn, showPreloader, errorUser } = useMyUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
    setValue,
  } = useForm<MyForms>({
    defaultValues: {
      formSignIN: {
        email: '',
        password: '',
      },
    },
  });
  useFormsInputsHelper({ watch, setValue });

  const { validateEmail, validatePassword, errorDefinitions } = useFormsValidation();

  const { formSignIN } = errors;
  const { password, email } = formSignIN || {};
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = (formSignIN: MyForms) => {
    signIn(formSignIN);
    reset({ formSignIN: { password: '' } });
  };

  const ErrorSignIN = <div className="form-error-response">{errorUser}</div>;

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
            <GoogleButton />
            <p className="hr">Or</p>
            <FormInput
              id="emailInputSignIN"
              type="text"
              placeholder="Email"
              register={register}
              registerType="formSignIN.email"
              isValid={isValid}
              validate={validateEmail}
              errors={errorsEmail}
              errorDefinitions={errorDefinitions.email}
            />
            <FormInput
              id="paswordInputSignIN"
              type="password"
              placeholder="Password"
              register={register}
              registerType="formSignIN.password"
              isValid={isValid}
              validate={validatePassword}
              errors={errorsPassword}
              errorDefinitions={errorDefinitions.password}
            />
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
          {errorUser && ErrorSignIN}
        </div>
      </form>
    </>
  );
}
