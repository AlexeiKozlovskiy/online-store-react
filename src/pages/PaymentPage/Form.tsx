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
  CARD,
  FORM_MESSAGES,
  FormErrorMessages,
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
  } = useForm<FormData>();
  const cartItemsState = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];
  const { totalPriceByPromocodes } = useMyTotalPriceContext();
  const navigate = useNavigate();
  const [submitData, setSubmitData] = useState({});
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [nameCard, setNameCard] = useState('');
  const [numberCard, setNumberCard] = useState('');
  const [dateCard, setDateCard] = useState('');
  const [cvvCard, setCvvCard] = useState('');
  const [
    {
      mesageName,
      mesageAdress,
      mesageEmail,
      mesagePhone,
      mesageNameCard,
      mesageNumberCard,
      mesageDateCard,
      mesageCvvCard,
    },
    setFormMessages,
  ] = useState<FormErrorMessages>({
    mesageName: null,
    mesageAdress: null,
    mesageEmail: null,
    mesagePhone: null,
    mesageNameCard: null,
    mesageNumberCard: null,
    mesageDateCard: null,
    mesageCvvCard: null,
  });

  const errorsName = errors.name?.type;
  const errorsAddress = errors.address?.type;
  const errorsEmail = errors.email?.type;
  const errorsPhone = errors.phone?.type;
  const errorsNameCard = errors.nameCard?.type;
  const errorsNumderCard = errors.numderCard?.type;
  const errorsDateCard = errors.dateCard?.type;
  const errorsCvvCard = errors.cvvCard?.type;

  const onSubmit = ({
    name,
    address,
    email,
    phone,
    nameCard,
    numderCard,
    cvvCard,
    dateCard,
  }: FormData) => {
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
        numderCard,
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
    reset();
    setTimeout(() => {
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
    formatName(watch('name'));
  }, [watch('name')]);

  useEffect(() => {
    formatAdress(watch('address'));
  }, [watch('address')]);

  useEffect(() => {
    formatEmail(watch('email'));
  }, [watch('email')]);

  useEffect(() => {
    formatPhone(watch('phone'));
  }, [watch('phone')]);

  useEffect(() => {
    formatCardName(watch('nameCard'));
  }, [watch('nameCard')]);

  useEffect(() => {
    formatCardNumber(watch('numderCard'));
  }, [watch('numderCard')]);

  useEffect(() => {
    formatCardDate(watch('dateCard'));
  }, [watch('dateCard')]);

  useEffect(() => {
    formatCardCvv(watch('cvvCard'));
  }, [watch('cvvCard')]);

  const errorDefinitions: Record<string, Record<ErrorType, JSX.Element>> = {
    name: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NAME),
      validate: ErrorMessage(mesageName!),
    },
    address: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_ADDRESS),
      validate: ErrorMessage(mesageAdress!),
    },
    email: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_EMAIL),
      validate: ErrorMessage(mesageEmail!),
    },
    phone: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_PHONE),
      validate: ErrorMessage(mesagePhone!),
    },
    nameCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NAME_CARD),
      validate: ErrorMessage(mesageNameCard!),
    },
    numberCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NUMBER_CARD),
      validate: ErrorMessage(mesageNumberCard!),
    },
    dateCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_DATE_CARD),
      validate: ErrorMessage(mesageDateCard!),
    },
    cvvCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_CVV_CARD),
      validate: ErrorMessage(mesageCvvCard!),
    },
  };

  function validateName(value: string) {
    const words = value.split(' ');
    if (words.length < 2 || !words.every((el) => el.length >= 1)) {
      setFormMessages({ mesageName: FORM_MESSAGES.NAME_CONTAINS_TWO_WORDS });
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\.\s]+$/)) {
      setFormMessages({ mesageName: FORM_MESSAGES.NAME_CONTAINS_INVALID_CHARACTERS });
      return false;
    }
    return true;
  }

  function validateAddress(value: string) {
    const words = value.split(' ');
    if (words.length < 3 || !words.every((el) => el.length >= 1)) {
      setFormMessages({ mesageAdress: FORM_MESSAGES.ADDRESS_CONTAINS_THREE_WORDS });
      return false;
    }
    return true;
  }

  function validateEmail(value: string) {
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setFormMessages({ mesageEmail: FORM_MESSAGES.INVALID_EMAIL });
      return false;
    }
    return true;
  }

  function validatePhone(value: string) {
    if (value.length <= 6) {
      setFormMessages({ mesagePhone: FORM_MESSAGES.PHONE_LENGTH });
      return false;
    }
    return true;
  }

  function validateNameCard(value: string) {
    const words = value.split(' ');
    if (words.length < 2) {
      setFormMessages({ mesageNameCard: FORM_MESSAGES.NAME_CONTAINS_TWO_WORDS });
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\s]+$/)) {
      setFormMessages({ mesageNameCard: FORM_MESSAGES.NAME_CONTAINS_INVALID_CHARACTERS });
      return false;
    }
    return true;
  }

  function validateNumderCard(value: string) {
    if (value.length < 16) {
      setFormMessages({ mesageNumberCard: FORM_MESSAGES.CARD_NUMBER_LENGTH });
      return false;
    }
    return true;
  }

  function validateDateCard(value: string) {
    const month = Number(value.substring(0, 2));
    const year = Number(value.substring(3, 5));

    if (value.length < 4) {
      setFormMessages({ mesageDateCard: FORM_MESSAGES.CARD_DATE_LENGTH });
      return false;
    } else {
      if (year < +thisYear || year > +thisYear + 5) {
        setFormMessages({ mesageDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
      if (month >= 12) {
        setFormMessages({ mesageDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
      if (year === +thisYear && +thisMonth >= month) {
        setFormMessages({ mesageDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
    }
  }

  function validateCvvCard(value: string) {
    if (value.length < 3) {
      setFormMessages({ mesageCvvCard: FORM_MESSAGES.INVALID_CARD_CVV });
      return false;
    }
  }

  function formatName(value: string) {
    setName(value.substring(0, 40));
  }

  function formatAdress(value: string) {
    setAdress(value.substring(0, 70));
  }

  function formatEmail(value: string) {
    setEmail(value.substring(0, 50));
  }

  function formatPhone(value: string) {
    setNumberPhone(value.replace(/[^\d+]/g, '').substring(0, 16));
  }

  function formatCardName(value: string) {
    setNameCard(value.substring(0, 40));
  }

  function formatCardNumber(value: string) {
    const valueNumber = value.replace(/[^\d]/g, '').substring(0, 16);
    setNumberCard(valueNumber.match(/.{1,4}/g)?.join(' ') || '');
    checkCardImg(value[0]);
  }

  function formatCardDate(value: string) {
    const valueDate = value.replace(/[^\d]/g, '').substring(0, 4);
    setDateCard(valueDate.match(/.{1,2}/g)?.join('/') || '');
  }

  function formatCardCvv(value: string) {
    setCvvCard(value.replace(/[^\d]/g, '').substring(0, 3));
  }

  function checkCardImg(value: string) {
    const img = document.querySelector<HTMLElement>('.cards');
    switch (value) {
      case CARD.EXPRESS:
        img!.classList.add('cards__img-express');
        break;
      case CARD.VISA:
        img!.classList.add('cards__img-visa');
        break;
      case CARD.MASTERCARD:
        img!.classList.add('cards__img-mastercard');
        break;
      default:
        img!.classList.remove('cards__img-express');
        img!.classList.remove('cards__img-visa');
        img!.classList.remove('cards__img-mastercard');
        break;
    }
  }

  function testDataClick() {
    setName('Rubi Rhod');
    setAdress('United States, New-York, Times Square');
    setEmail('Rubi_Rod@icloud.com');
    setNumberPhone('+37533123456789');
    setNameCard('RUBI RHOD');
    setNumberCard('5555 4444 3333 2222');
    setDateCard('05/25');
    setCvvCard('123');
  }

  function ErrorMessage(message: string) {
    return <div className="error-message">{message}</div>;
  }

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
                  value={name}
                  {...register('name', {
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
                  value={adress}
                  {...register('address', { required: true, validate: validateAddress })}
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
                  value={email}
                  {...register('email', { required: true, validate: validateEmail })}
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
                  value={numberPhone}
                  {...register('phone', {
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
              <div className="payment-method__cards cards">
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
                  value={nameCard}
                  {...register('nameCard', { required: true, validate: validateNameCard })}
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
                  value={numberCard}
                  {...register('numderCard', { required: true, validate: validateNumderCard })}
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
                    value={dateCard}
                    {...register('dateCard', {
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
                    value={cvvCard}
                    {...register('cvvCard', {
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
