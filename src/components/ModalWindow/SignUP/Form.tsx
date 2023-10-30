import { HeaderLogo } from '@/components/HeaderLogo/HeaderLogo';
import { useForm } from 'react-hook-form';
import { FormDataSignUP } from '@/types/types';
import { useEffect, useState } from 'react';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';

interface IForm {
  setOpenModalSignUP: (value: boolean) => void;
  handelCloseModalSignUP: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Form({ setOpenModalSignUP, handelCloseModalSignUP }: IForm) {
  const [submitSignUPData, setSubmitSignUPData] = useState({});
  const [showPreloader, setShowPreloader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormDataSignUP>({
    defaultValues: {
      formSignUP: {
        name: '',
        email: '',
        password: '',
      },
    },
  });
  const { validateName, validateEmail, validatePassword, errorDefinitions } = useFormsValidation();
  useFormsInputsHelper({ watch, setValue });
  const { formSignUP } = errors;
  const { name, password, email } = formSignUP || {};
  const errorsName = name?.type;
  const errorsPassword = password?.type;
  const errorsEmail = email?.type;

  const onSubmit = ({ formSignUP }: FormDataSignUP) => {
    const { name, email, password } = formSignUP;
    setShowPreloader(true);
    setSubmitSignUPData({
      formDataSighUP: {
        name,
        email,
        password,
      },
    });
    setTimeout(() => {
      reset();
      setOpenModalSignUP(false);
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
      <form className="signUP-form animation-view-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signUP-details">
          <div
            className="modal__close-btn"
            data-id="close-modal-signUP"
            onClick={() => handelCloseModalSignUP}
          ></div>
          <div className="signUP-details__title">SIGN UP</div>
          <div className="signUP-details__logo">
            <HeaderLogo />
          </div>
          <div className="signUP-details__info">
            <div>
              <input
                placeholder="Name"
                className={`signUP-details__name ${errorsName && 'invalid'} ${isValid && 'valid'}`}
                type="text"
                id="nameInputSignUP"
                {...register('formSignUP.name', {
                  required: true,
                  validate: validateName,
                })}
              />
              {errorsName && errorDefinitions.name[errorsName]}
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
        </div>
      </form>
    </>
  );
}
