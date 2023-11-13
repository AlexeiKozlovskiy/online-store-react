import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeAllProductsFromCart } from '@/reducers/controller';
import { RootReducerProps, CartItem, CardImages, MyForms } from '@/types/types';
import { useMyTotalPriceContext } from '@/context/TotalPriseContext';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';
import { FormInput } from '@/components/FormInput/FormInput';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';
import { CARD_IMAGES, TEST_USER_DATA } from '@/helpers/constant';

interface IForm {
  handelCloseModalPayment: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Form({ handelCloseModalPayment }: IForm) {
  const { totalPriceByPromocodes } = useMyTotalPriceContext();
  const [submitData, setSubmitData] = useState({});
  const [imageValue, setImageValue] = useState('');
  const [showPreloader, setShowPreloader] = useState(false);
  const navigate = useNavigate();
  const cartItemsState = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
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
        totalPriceOrder: totalPriceByPromocodes,
      },
      buyProducts: cartItemsState.map(({ product, quantity }) => {
        return {
          IDProduct: product.id,
          nameProduct: product.name,
          quantity,
        };
      }),
    });
    setTimeout(() => {
      reset();
      removeAllProductsFromCart();
      navigate('/');
    }, 2000);
  };
  useFormsInputsHelper({ watch, setValue });

  useEffect(() => {
    if (Object.keys(submitData).length !== 0) {
      console.log('submitData', submitData);
    }
  }, [submitData]);

  useEffect(() => {
    const curImage = CARD_IMAGES[+watch('formPayment.numberCard')![0] as keyof CardImages];
    setImageValue(curImage);
  }, [watch('formPayment'), watch('formPayment.numberCard')]);

  function testDataClick() {
    setValue('formPayment', TEST_USER_DATA);
  }

  return (
    <>
      <form className="payment-details__info animation-view-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="payment-page__payment-details payment-details">
          <div className="payment-details__credentials">
            <div
              className="modal__close-btn"
              data-id="close-modal-payment"
              onClick={() => handelCloseModalPayment}
            ></div>
            <h4 className="payment-details__title">PAYMENT DETAILS</h4>
            <div className="payment-details__info">
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
          </div>
          <div className="payment-details__payment-method payment-method">
            <div className="payment-method__top">
              <h4 className="payment-method__title">PAYMENT METHOD</h4>
              <div className={`payment-method__cards ${imageValue}`}>
                <div className="cards__img"></div>
              </div>
            </div>
            <div className="payment-method__card-details card-details">
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
              <div className="card-details__bottom-row bottom-row">
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
          </div>
          <button className="main-modal-btn">Place order now</button>
          <div className="payment-test" onClick={testDataClick}>
            Test payment data
          </div>
          {showPreloader && <Preloader />}
        </div>
      </form>
    </>
  );
}
