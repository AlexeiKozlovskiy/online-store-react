import './ProfilePage.scss';
import { FormInput } from '@/components/FormInput/FormInput';
import { useForm } from 'react-hook-form';
import { MyForms, CardImages } from '@/types/types';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/components/UserProfile/UserProfile';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';
import { Preloader } from '@/components/Preloader/Preloader';
import { CARD_IMAGES, TEST_USER_DATA } from '@/helpers/constant';

export function ProfilePage() {
  const [submitData, setSubmitData] = useState({});
  const [currentSection, setCurrentSection] = useState('profile');
  const [showPreloader, setShowPreloader] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<MyForms>({
    defaultValues: {
      formPayment: {
        name: '',
        address: '',
        email: '',
        phone: '',
        nameCard: '',
        numberCard: '',
        dateCard: '',
        cvvCard: '',
      },
    },
  });
  const {
    validateName,
    validateAddress,
    validateEmail,
    validatePhone,
    validateNameCard,
    validateNumderCard,
    validateDateCard,
    validateCvvCard,
    errorDefinitions,
  } = useFormsValidation();
  useFormsInputsHelper({ watch, setValue });

  const { formPayment } = errors;
  const { name, address, email, phone, nameCard, numberCard, cvvCard, dateCard } =
    formPayment || {};
  const errorsName = name?.type;
  const errorsAddress = address?.type;
  const errorsEmail = email?.type;
  const errorsPhone = phone?.type;
  const errorsNameCard = nameCard?.type;
  const errorsNumderCard = numberCard?.type;
  const errorsDateCard = dateCard?.type;
  const errorsCvvCard = cvvCard?.type;

  const onSubmit = ({ formPayment }: MyForms) => {
    const { name, address, email, phone, nameCard, numberCard, cvvCard, dateCard } = formPayment;
    setShowPreloader(true);
    setSubmitData({
      diliveryData: {
        name,
        address,
        email,
        phone,
      },
      paymentData: {
        nameCard,
        numberCard,
        cvvCard,
        dateCard,
      },
    });
    setTimeout(() => {
      setShowPreloader(false);
    }, 2000);
  };

  useEffect(() => {
    if (Object.keys(submitData).length !== 0) {
      console.log('submitData', submitData);
    }
  }, [submitData]);

  useEffect(() => {
    const curImage = CARD_IMAGES[+watch('formPayment.numberCard')![0] as keyof CardImages];
    setImageValue(curImage);
  }, [watch('formPayment'), watch('formPayment.numberCard')]);

  function handelClickList(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    const { id } = dataset;

    if (id === 'profile') {
      setCurrentSection('profile');
    }
    if (id === 'shopping') {
      setCurrentSection('shopping');
    }
  }

  function testDataClick() {
    setValue('formPayment', TEST_USER_DATA);
  }

  return (
    <main className="profile">
      <h3 className="profile__titel">MY PROFILE</h3>
      <div className="profile__container">
        <aside className="profile__panel">
          <ul className="profile__list">
            <li data-id="profile" onClick={(e) => handelClickList(e)}>
              Profile
            </li>
            <li data-id="shopping" onClick={(e) => handelClickList(e)}>
              My shopping
            </li>
          </ul>
        </aside>
        {currentSection === 'profile' && (
          <section className="profile__section section-profile">
            <UserProfile />
            <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="profile-form__info">
                <h4 className="profile-form__title">PAYMENT DETAILS</h4>
                <FormInput
                  id="nameInput"
                  type="text"
                  placeholder="Name"
                  register={register}
                  registerType="formPayment.name"
                  isValid={isValid}
                  validate={validateName}
                  errors={errorsName}
                  errorDefinitions={errorDefinitions.name}
                />
                <FormInput
                  id="addressInput"
                  type="text"
                  placeholder="Address"
                  register={register}
                  registerType="formPayment.address"
                  isValid={isValid}
                  validate={validateAddress}
                  errors={errorsAddress}
                  errorDefinitions={errorDefinitions.address}
                />
                <FormInput
                  id="emailInput"
                  type="text"
                  placeholder="Email"
                  register={register}
                  registerType="formPayment.email"
                  isValid={isValid}
                  validate={validateEmail}
                  errors={errorsEmail}
                  errorDefinitions={errorDefinitions.email}
                />
                <FormInput
                  id="phoneInput"
                  type="tel"
                  placeholder="Phone +375 ..."
                  register={register}
                  registerType="formPayment.phone"
                  isValid={isValid}
                  validate={validatePhone}
                  errors={errorsPhone}
                  errorDefinitions={errorDefinitions.phone}
                />
              </div>
              <div className="payment-method__top">
                <h4 className="profile-form__title">PAYMENT METHOD</h4>
                <div className={`payment-method__cards ${imageValue}`}>
                  <div className="cards__img"></div>
                </div>
              </div>
              <div className="profile-form__info">
                <FormInput
                  id="cardInput"
                  type="text"
                  placeholder="Name on card"
                  register={register}
                  registerType="formPayment.nameCard"
                  isValid={isValid}
                  validate={validateNameCard}
                  errors={errorsNameCard}
                  errorDefinitions={errorDefinitions.nameCard}
                />
                <FormInput
                  id="numberCartInput"
                  type="text"
                  placeholder="хxxx xxxx xxxx xxxx"
                  register={register}
                  registerType="formPayment.numberCard"
                  isValid={isValid}
                  validate={validateNumderCard}
                  errors={errorsNumderCard}
                  errorDefinitions={errorDefinitions.numberCard}
                />
                <div className="profile-form__info bottom-row">
                  <FormInput
                    id="dateCartInput"
                    type="text"
                    placeholder="MM/YY"
                    className="bottom-row__date"
                    register={register}
                    registerType="formPayment.dateCard"
                    isValid={isValid}
                    validate={validateDateCard}
                    errors={errorsDateCard}
                    errorDefinitions={errorDefinitions.dateCard}
                  />
                  <FormInput
                    id="cvvCardInput"
                    type="text"
                    placeholder="CVV"
                    className="bottom-row__cvv"
                    register={register}
                    registerType="formPayment.cvvCard"
                    isValid={isValid}
                    validate={validateCvvCard}
                    errors={errorsCvvCard}
                    errorDefinitions={errorDefinitions.cvvCard}
                  />
                </div>
              </div>
              <button className="profile-btn">Save</button>
            </form>
            {showPreloader && <Preloader />}
            <div className="payment-test" onClick={testDataClick}>
              Test user data
            </div>
          </section>
        )}
        {currentSection === 'shopping' && (
          <section className="profile__section section-my-shopping">
            <p>In developing</p>
          </section>
        )}
      </div>
    </main>
  );
}
