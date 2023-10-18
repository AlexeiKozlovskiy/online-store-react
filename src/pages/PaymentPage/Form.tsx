import './PaymentPage.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { thisYear, thisMonth } from '@/components/helpers/helpersFunc';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeAllProductsFromCart } from '@/components/reducers/controller';
import {
  CartItemReducerProps,
  CartItem,
  FormData,
  ErrorType,
  FORM_MESSAGES,
  FormErrorMessages,
  CardImages,
} from '@/components/types/types';
import { useMyTotalPriceContext } from '@/components/Context/TotalPriseContext';

interface IForm {
  handelCloseModal: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function Form({ handelCloseModal }: IForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      form: {
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
  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const { totalPriceByPromocodes } = useMyTotalPriceContext();
  const navigate = useNavigate();
  const [
    { msgName, msgAdress, msgEmail, msgPhone, msgNameCard, msgNumberCard, msgDateCard, msgCvvCard },
    setFormMessages,
  ] = useState<FormErrorMessages>({
    msgName: null,
    msgAdress: null,
    msgEmail: null,
    msgPhone: null,
    msgNameCard: null,
    msgNumberCard: null,
    msgDateCard: null,
    msgCvvCard: null,
  });
  const [submitData, setSubmitData] = useState({});
  const [imageValue, setImageValue] = useState('');

  const { form } = errors;
  const { name, address, email, phone, nameCard, numberCard, cvvCard, dateCard } = form || {};

  const errorsName = name?.type;
  const errorsAddress = address?.type;
  const errorsEmail = email?.type;
  const errorsPhone = phone?.type;
  const errorsNameCard = nameCard?.type;
  const errorsNumderCard = numberCard?.type;
  const errorsDateCard = dateCard?.type;
  const errorsCvvCard = cvvCard?.type;

  const onSubmit = ({ form }: FormData) => {
    const { name, address, email, phone, nameCard, numberCard, cvvCard, dateCard } = form;

    const spinner = document.querySelector<HTMLElement>('.loading-spinner');
    spinner!.style.display = 'flex';
    const orderID = uuidv4();

    setSubmitData({
      orderID,
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

  useEffect(() => {
    if (Object.keys(submitData).length !== 0) {
      console.log(submitData);
    }
  }, [submitData]);

  useEffect(() => {
    setValue('form.name', watch('form.name')?.substring(0, 40));
  }, [watch('form.name')]);

  useEffect(() => {
    setValue('form.address', watch('form.address')?.substring(0, 70));
  }, [watch('form.address')]);

  useEffect(() => {
    setValue('form.email', watch('form.email')?.substring(0, 50));
  }, [watch('form.email')]);

  useEffect(() => {
    setValue(
      'form.phone',
      watch('form.phone')
        ?.replace(/[^\d+]/g, '')
        .substring(0, 16)
    );
  }, [watch('form.phone')]);

  useEffect(() => {
    setValue('form.nameCard', watch('form.nameCard')?.substring(0, 40));
  }, [watch('form.nameCard')]);

  useEffect(() => {
    const valueNumber =
      watch('form.numberCard')
        ?.replace(/[^\d]/g, '')
        .substring(0, 16)
        .match(/.{1,4}/g)
        ?.join(' ') || '';
    setValue('form.numberCard', valueNumber);
  }, [watch('form.numberCard')]);

  useEffect(() => {
    const valueDate =
      watch('form.dateCard')
        ?.replace(/[^\d]/g, '')
        .substring(0, 4)
        .match(/.{1,2}/g)
        ?.join('/') || '';
    setValue('form.dateCard', valueDate);
  }, [watch('form.dateCard')]);

  useEffect(() => {
    setValue('form.cvvCard', watch('form.cvvCard')?.replace(/[^\d]/g, '').substring(0, 3));
  }, [watch('form.cvvCard')]);

  useEffect(() => {
    const curImage = cardImages[+watch('form.numberCard')![0] as keyof CardImages];
    setImageValue(curImage);
  }, [watch('form'), watch('form.numberCard')]);

  const errorDefinitions: Record<string, Record<ErrorType, JSX.Element>> = {
    name: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NAME),
      validate: ErrorMessage(msgName!),
    },
    address: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_ADDRESS),
      validate: ErrorMessage(msgAdress!),
    },
    email: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_EMAIL),
      validate: ErrorMessage(msgEmail!),
    },
    phone: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_PHONE),
      validate: ErrorMessage(msgPhone!),
    },
    nameCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NAME_CARD),
      validate: ErrorMessage(msgNameCard!),
    },
    numberCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NUMBER_CARD),
      validate: ErrorMessage(msgNumberCard!),
    },
    dateCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_DATE_CARD),
      validate: ErrorMessage(msgDateCard!),
    },
    cvvCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_CVV_CARD),
      validate: ErrorMessage(msgCvvCard!),
    },
  };

  function validateName(value?: string) {
    if (!value) return;
    const words = value.split(' ');
    if (words.length < 2 || !words.every((el) => el.length >= 1)) {
      setFormMessages({ msgName: FORM_MESSAGES.NAME_CONTAINS_TWO_WORDS });
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\.\s]+$/)) {
      setFormMessages({ msgName: FORM_MESSAGES.NAME_CONTAINS_INVALID_CHARACTERS });
      return false;
    }
  }

  function validateAddress(value?: string) {
    if (!value) return;
    const words = value.split(' ');
    if (words.length < 3 || !words.every((el) => el.length >= 1)) {
      setFormMessages({ msgAdress: FORM_MESSAGES.ADDRESS_CONTAINS_THREE_WORDS });
      return false;
    }
  }

  function validateEmail(value?: string) {
    if (!value) return;
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setFormMessages({ msgEmail: FORM_MESSAGES.INVALID_EMAIL });
      return false;
    }
  }

  function validatePhone(value?: string) {
    if (!value) return;
    if (value.length <= 6) {
      setFormMessages({ msgPhone: FORM_MESSAGES.PHONE_LENGTH });
      return false;
    }
  }

  function validateNameCard(value?: string) {
    if (!value) return;
    const words = value.split(' ');
    if (words.length < 2) {
      setFormMessages({ msgNameCard: FORM_MESSAGES.NAME_CONTAINS_TWO_WORDS });
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\s]+$/)) {
      setFormMessages({ msgNameCard: FORM_MESSAGES.NAME_CONTAINS_INVALID_CHARACTERS });
      return false;
    }
  }

  function validateNumderCard(value?: string) {
    if (!value) return;
    if (value.length < 16) {
      setFormMessages({ msgNumberCard: FORM_MESSAGES.CARD_NUMBER_LENGTH });
      return false;
    }
  }

  function validateDateCard(value?: string) {
    if (!value) return;
    const month = Number(value.substring(0, 2));
    const year = Number(value.substring(3, 5));

    if (value.length < 4) {
      setFormMessages({ msgDateCard: FORM_MESSAGES.CARD_DATE_LENGTH });
      return false;
    } else {
      if (year < +thisYear || year > +thisYear + 5) {
        setFormMessages({ msgDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
      if (month >= 12) {
        setFormMessages({ msgDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
      if (year === +thisYear && +thisMonth >= month) {
        setFormMessages({ msgDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
    }
  }

  function validateCvvCard(value?: string) {
    if (!value) return;
    if (value.length < 3) {
      setFormMessages({ msgCvvCard: FORM_MESSAGES.INVALID_CARD_CVV });
      return false;
    }
  }

  function testDataClick() {
    setValue('form', {
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

  function ErrorMessage(message: string) {
    return <div className="error-message">{message}</div>;
  }

  const cardImages: CardImages = {
    3: 'cards__img-express',
    4: 'cards__img-visa',
    5: 'cards__img-mastercard',
  };

  return (
    <>
      <form className="payment-details__info" onSubmit={handleSubmit(onSubmit)}>
        <div className="payment-page__payment-details payment-details">
          <div className="payment-details__credentials">
            <div
              className="payment-details__close-btn"
              data-id="close-modal"
              onClick={handelCloseModal}
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
                  {...register('form.name', {
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
                  {...register('form.address', {
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
                  {...register('form.email', { required: true, validate: validateEmail })}
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
                  {...register('form.phone', {
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
                  {...register('form.nameCard', {
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
                  {...register('form.numberCard', {
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
                    {...register('form.dateCard', {
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
                    {...register('form.cvvCard', {
                      required: true,
                      validate: validateCvvCard,
                    })}
                  />
                  {errorsCvvCard && errorDefinitions.cvvCard[errorsCvvCard]}
                </div>
              </div>
            </div>
          </div>
          <button className="summary-content__order-btn">Place order now</button>
          <div className="payment-test" onClick={testDataClick}>
            Test payment data
          </div>
          <div className="loading-spinner"></div>
        </div>
      </form>
    </>
  );
}
