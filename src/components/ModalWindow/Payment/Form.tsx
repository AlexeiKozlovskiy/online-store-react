import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeAllProductsFromCart } from '@/reducers/controller';
import { RootReducerProps, CartItem, FormDataPayment, CardImages } from '@/types/types';
import { useMyTotalPriceContext } from '@/context/TotalPriseContext';
import { Preloader } from '@/components/Preloader/Preloader';
import { useFormsValidation } from '@/components/CustomHook/FormsValidationHook';
import { useFormsInputsHelper } from '@/components/CustomHook/FormsInputsHelperHook';

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
    validateName,
    validateEmail,
    validateAddress,
    validatePhone,
    validateNameCard,
    validateNumderCard,
    validateDateCard,
    validateCvvCard,
    errorDefinitions,
  } = useFormsValidation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormDataPayment>({
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

  const onSubmit = ({ formPayment }: FormDataPayment) => {
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
    const curImage = cardImages[+watch('formPayment.numberCard')![0] as keyof CardImages];
    setImageValue(curImage);
  }, [watch('formPayment'), watch('formPayment.numberCard')]);

  function testDataClick() {
    setValue('formPayment', {
      name: 'Rubi Rhod',
      address: 'United States, New-York, Times Square',
      email: 'Rubi_Rod@icloud.com',
      phone: '+37533123456789',
      nameCard: 'RUBI RHOD',
      numberCard: '5555 4444 3333 2222',
      dateCard: '05/25',
      cvvCard: '123',
    });
  }

  const cardImages: CardImages = {
    3: 'cards__img-express',
    4: 'cards__img-visa',
    5: 'cards__img-mastercard',
  };

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
            <div className="payment-details__title">PAYMENT DETAILS</div>
            <div className="payment-details__info">
              <div>
                <input
                  placeholder="Name"
                  className={`payment-details__name ${errorsName && 'invalid'} ${
                    isValid && 'valid'
                  }`}
                  type="text"
                  id="nameInput"
                  {...register('formPayment.name', {
                    required: true,
                    validate: validateName,
                  })}
                />
                {errorsName && errorDefinitions.name[errorsName]}
              </div>
              <div>
                <input
                  placeholder="Address"
                  className={`payment-details__shipping-address ${errorsAddress && 'invalid'} ${
                    isValid && 'valid'
                  }`}
                  type="text"
                  id="addressInput"
                  {...register('formPayment.address', {
                    required: true,
                    validate: validateAddress,
                  })}
                />
                {errorsAddress && errorDefinitions.address[errorsAddress]}
              </div>
              <div>
                <input
                  placeholder="Email"
                  className={`payment-details__email ${errorsEmail && 'invalid'} ${
                    isValid && 'valid'
                  }`}
                  type="text"
                  id="emailInput"
                  {...register('formPayment.email', { required: true, validate: validateEmail })}
                />
                {errorsEmail && errorDefinitions.email[errorsEmail]}
              </div>
              <div>
                <input
                  placeholder="Phone +375 ..."
                  className={`payment-details__phone-number ${errorsPhone && 'invalid'} ${
                    isValid && 'valid'
                  }`}
                  type="tel"
                  id="phoneInput"
                  {...register('formPayment.phone', {
                    required: true,
                    validate: validatePhone,
                  })}
                />
                {errorsPhone && errorDefinitions.phone[errorsPhone]}
              </div>
            </div>
          </div>
          <div className="payment-details__payment-method payment-method">
            <div className="payment-method__top">
              <div className="payment-method__title">PAYMENT METHOD</div>
              <div className={`payment-method__cards ${imageValue}`}>
                <div className="cards__img"></div>
              </div>
            </div>
            <div className="payment-method__card-details card-details">
              <div>
                <input
                  placeholder="Name on card"
                  className={`card-details__name ${errorsNameCard && 'invalid'} ${
                    isValid && 'valid'
                  }`}
                  type="text"
                  id="cardInput"
                  {...register('formPayment.nameCard', {
                    required: true,
                    validate: validateNameCard,
                  })}
                />
                {errorsNameCard && errorDefinitions.nameCard[errorsNameCard]}
              </div>
              <div>
                <input
                  placeholder="хxxx xxxx xxxx xxxx"
                  className={`card-details__card-number ${errorsNumderCard && 'invalid'} ${
                    isValid && 'valid'
                  }`}
                  type="text"
                  id="numberCartInput"
                  {...register('formPayment.numberCard', {
                    required: true,
                    validate: validateNumderCard,
                  })}
                />
                {errorsNumderCard && errorDefinitions.numberCard[errorsNumderCard]}
              </div>

              <div className="card-details__bottom-row bottom-row">
                <div>
                  <input
                    placeholder="MM/YY"
                    className={`card-details__date bottom-row__date ${
                      errorsDateCard && 'invalid'
                    } ${isValid && 'valid'}`}
                    type="text"
                    id="dateCartInput"
                    {...register('formPayment.dateCard', {
                      required: true,
                      validate: validateDateCard,
                    })}
                  />
                  {errorsDateCard && errorDefinitions.dateCard[errorsDateCard]}
                </div>
                <div>
                  <input
                    placeholder="CVV"
                    className={`card-details__cvv bottom-row__cvv ${errorsCvvCard && 'invalid'} ${
                      isValid && 'valid'
                    }`}
                    type="text"
                    id="cvvCardInput"
                    {...register('formPayment.cvvCard', {
                      required: true,
                      validate: validateCvvCard,
                    })}
                  />
                  {errorsCvvCard && errorDefinitions.cvvCard[errorsCvvCard]}
                </div>
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
