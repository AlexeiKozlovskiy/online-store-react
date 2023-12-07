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
import { useMyUserContext } from '@/context/UserContext';
import { useMyProfileUserContext } from '@/context/ProfileUserContext';

export function ProfilePage() {
  const [currentSection, setCurrentSection] = useState('profile');
  const [imageValue, setImageValue] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating: isValid },
    watch,
    setValue,
  } = useForm<MyForms>({
    defaultValues: {
      formProfile: {},
    },
  });
  const {
    validateName,
    validateAddress,
    validatePhone,
    validateNameCard,
    validateNumderCard,
    validateDateCard,
    validateCvvCard,
    errorDefinitions,
  } = useFormsValidation();
  useFormsInputsHelper({ watch, setValue });
  const { user } = useMyUserContext();
  const {
    getUserProfile,
    isFetching,
    createUserProfile,
    isEmptyProfile,
    updateUserProfile,
    showPreloaderChanges,
  } = useMyProfileUserContext();

  const { formProfile } = errors;
  const { name, address, email, phone, nameCard, numberCard, cvvCard, dateCard } =
    formProfile || {};
  const errorsName = name?.type;
  const errorsAddress = address?.type;
  const errorsEmail = email?.type;
  const errorsPhone = phone?.type;
  const errorsNameCard = nameCard?.type;
  const errorsNumderCard = numberCard?.type;
  const errorsDateCard = dateCard?.type;
  const errorsCvvCard = cvvCard?.type;

  const onSubmit = ({ formProfile }: MyForms) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...dataForm } = formProfile;
    if (isEmptyProfile) {
      createUserProfile(dataForm);
    } else if (!isEmptyProfile) {
      updateUserProfile(dataForm);
    }
  };

  useEffect(() => {
    async function getProfile() {
      const profile = await getUserProfile();
      profile && setValue('formProfile', profile);
    }
    getProfile();
  }, []);

  useEffect(() => {
    function checkImageCard() {
      const curImage = CARD_IMAGES[+watch('formProfile.numberCard')![0] as keyof CardImages];
      setImageValue(curImage);
    }
    checkImageCard();
  }, [watch('formProfile'), watch('formProfile.numberCard')]);

  useEffect(() => {
    user && setValue('formProfile.email', user.email);
  }, [user, watch('formProfile.email')]);

  function testDataClick() {
    setValue('formProfile', TEST_USER_DATA);
  }

  function handelClickList(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    const { id } = dataset;
    switch (id) {
      case 'profile':
        setCurrentSection('profile');
        break;
      case 'favorites':
        setCurrentSection('favorites');
        break;
      case 'shopping':
        setCurrentSection('shopping');
        break;
    }
  }

  const preloader = (
    <div className="profile-preloader-container">
      <Preloader />
    </div>
  );

  return (
    <main className="profile">
      <h2 className="profile__titel">MY PROFILE</h2>
      <div className="profile__container">
        <aside className="profile__panel">
          <ul className="profile__list">
            <li data-id="profile" onClick={(e) => handelClickList(e)}>
              Profile
            </li>
            <li data-id="favorites" onClick={(e) => handelClickList(e)}>
              Favorites
            </li>
            <li data-id="shopping" onClick={(e) => handelClickList(e)}>
              My shopping
            </li>
          </ul>
        </aside>
        {currentSection === 'profile' && (
          <section className="profile__section section-profile">
            <UserProfile />
            <>
              {isFetching && preloader}
              {showPreloaderChanges && preloader}
              <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="profile-form__info">
                  <h4 className="profile-form__title">PAYMENT DETAILS</h4>
                  <FormInput
                    id="nameInput"
                    type="text"
                    name={watch('formProfile.name') && 'Name'}
                    placeholder="Name"
                    register={register}
                    registerType="formProfile.name"
                    isValid={isValid}
                    validate={validateName}
                    errors={errorsName}
                    errorDefinitions={errorDefinitions.name}
                  />
                  <FormInput
                    id="addressInput"
                    type="text"
                    name={watch('formProfile.address') && 'Address'}
                    placeholder="Address"
                    register={register}
                    registerType="formProfile.address"
                    isValid={isValid}
                    validate={validateAddress}
                    errors={errorsAddress}
                    errorDefinitions={errorDefinitions.address}
                  />
                  <FormInput
                    id="emailInput"
                    type="text"
                    name={watch('formProfile.email') && 'Email'}
                    disabled={true}
                    required={false}
                    placeholder="Email"
                    register={register}
                    registerType="formProfile.email"
                    isValid={isValid}
                    errors={errorsEmail}
                    errorDefinitions={errorDefinitions.email}
                  />
                  <FormInput
                    id="phoneInput"
                    type="tel"
                    name={watch('formProfile.phone') && 'Phone'}
                    placeholder="Phone"
                    register={register}
                    registerType="formProfile.phone"
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
                    name={watch('formProfile.nameCard') && 'Name on card'}
                    placeholder="Name on card"
                    register={register}
                    registerType="formProfile.nameCard"
                    isValid={isValid}
                    validate={validateNameCard}
                    errors={errorsNameCard}
                    errorDefinitions={errorDefinitions.nameCard}
                  />
                  <FormInput
                    id="numberCartInput"
                    type="text"
                    name={watch('formProfile.numberCard') && 'Number card'}
                    placeholder="хxxx xxxx xxxx xxxx"
                    register={register}
                    registerType="formProfile.numberCard"
                    isValid={isValid}
                    validate={validateNumderCard}
                    errors={errorsNumderCard}
                    errorDefinitions={errorDefinitions.numberCard}
                  />
                  <div className="profile-form__info bottom-row">
                    <FormInput
                      id="dateCartInput"
                      type="text"
                      name={watch('formProfile.dateCard') && 'MM/YY'}
                      placeholder="MM/YY"
                      className="bottom-row__date"
                      register={register}
                      registerType="formProfile.dateCard"
                      isValid={isValid}
                      validate={validateDateCard}
                      errors={errorsDateCard}
                      errorDefinitions={errorDefinitions.dateCard}
                    />
                    <FormInput
                      id="cvvCardInput"
                      type="text"
                      name={watch('formProfile.cvvCard') && 'CVV'}
                      placeholder="CVV"
                      className="bottom-row__cvv"
                      register={register}
                      registerType="formProfile.cvvCard"
                      isValid={isValid}
                      validate={validateCvvCard}
                      errors={errorsCvvCard}
                      errorDefinitions={errorDefinitions.cvvCard}
                    />
                  </div>
                </div>
                <button className="profile-btn">{isEmptyProfile ? `Save` : 'Change'}</button>
                <div className="payment-test" onClick={testDataClick}>
                  Test user data
                </div>
              </form>
            </>
          </section>
        )}
        {currentSection === 'favorites' && (
          <section className="profile__section section-my-shopping">
            <p>Favorites section in developing...</p>
          </section>
        )}
        {currentSection === 'shopping' && (
          <section className="profile__section section-my-shopping">
            <p>My shopping section in developing...</p>
          </section>
        )}
      </div>
    </main>
  );
}
