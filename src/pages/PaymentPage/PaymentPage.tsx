import { useEffect, useState } from 'react';
import './PaymentPage.scss';
import { LiteralUnion, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { thisYear, thisMonth } from '@/components/helpers/helpersFunc';

interface IPaymentModal {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export interface FormInputData {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  nameCard: string;
  numderCard: string;
  dateCard: string;
  cvvCard: string;
}

type ErrorType = LiteralUnion<'required' | 'validate', string>;

export function PaymentModal({ openModal, setOpenModal }: IPaymentModal) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormInputData>();

  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [email, setEmail] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [nameCard, setNameCard] = useState('');
  const [numberCard, setNumberCard] = useState('');
  const [dateCard, setDateCard] = useState('');
  const [cvvCard, setCvvCard] = useState('');
  const [errorMesageName, setErrorMesageName] = useState('');
  const [errorMesageAdress, setErrorMesageAdress] = useState('');
  const [errorMesageEmail, setErrorMesageEmail] = useState('');
  const [errorMesagePhone, setErrorMesagePhone] = useState('');
  const [errorMesageNameCard, setErrorMesageNameCard] = useState('');
  const [errorMesageNumberCard, setErrorMesageNumberCard] = useState('');
  const [errorMesageDateCard, setErrorMesageDateCard] = useState('');
  const [errorMesageCvvCard, setErrorMesageCvvCard] = useState('');

  const errorsName = errors.name?.type;
  const errorsAddress = errors.address?.type;
  const errorsEmail = errors.email?.type;
  const errorsPhone = errors.phone?.type;
  const errorsNameCard = errors.nameCard?.type;
  const errorsNumderCard = errors.numderCard?.type;
  const errorsDateCard = errors.dateCard?.type;
  const errorsCvvCard = errors.cvvCard?.type;

  const onSubmit = (data: FormInputData) => {
    const idDate = uuidv4();
    console.log({ ...data, id: idDate });
    reset();
  };

  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.payment-page');
    if (openModal) {
      container!.style.display = 'flex';
    }
    if (!openModal) {
      container!.style.display = 'none';
    }
  }, [openModal]);

  function handelCloseModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { dataset } = e.target as HTMLElement;
    if (dataset.id === 'close-modal') {
      setOpenModal(false);
    }
  }

  function ErrorMessage(message: string) {
    return <div className="error-message">{message}</div>;
  }

  const errorDefinitions: Record<string, Record<ErrorType, JSX.Element>> = {
    name: {
      required: ErrorMessage('Please enter name'),
      validate: ErrorMessage(errorMesageName),
    },
    address: {
      required: ErrorMessage('Please enter address'),
      validate: ErrorMessage(errorMesageAdress),
    },
    email: {
      required: ErrorMessage('Please enter email'),
      validate: ErrorMessage(errorMesageEmail),
    },
    phone: {
      required: ErrorMessage('Please enter phone'),
      validate: ErrorMessage(errorMesagePhone),
    },
    nameCard: {
      required: ErrorMessage('Please enter name card'),
      validate: ErrorMessage(errorMesageNameCard),
    },
    numberCard: {
      required: ErrorMessage('Please enter number card'),
      validate: ErrorMessage(errorMesageNumberCard),
    },
    dateCard: {
      required: ErrorMessage('Please enter number card'),
      validate: ErrorMessage(errorMesageDateCard),
    },
    cvvCard: {
      required: ErrorMessage('Please enter cvv card'),
      validate: ErrorMessage(errorMesageCvvCard),
    },
  };

  function validateName(value: string) {
    const words = value.split(' ');
    console.log(words.some((el) => el.length >= 3));
    if (words.length < 2 || !words.every((el) => el.length >= 1)) {
      setErrorMesageName('Name must contain at least 2 words');
      return false;
    }

    if (!value.match(/^[a-zA-Zа-яА-Я\.\s]+$/)) {
      setErrorMesageName('Name contains invalid characters');
      return false;
    }
    return true;
  }

  function validateAdress(value: string) {
    const words = value.split(' ');
    if (words.length < 3 || !words.every((el) => el.length >= 1)) {
      setErrorMesageAdress('Adress must contain at least 3 words');
      return false;
    }
    return true;
  }

  function validateEmail(value: string) {
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setErrorMesageEmail('Invalid email');
      return false;
    }
    return true;
  }

  function validatePhone(value: string) {
    if (value.length <= 6) {
      setErrorMesagePhone('Phone invalid length');
      return false;
    }
    return true;
  }

  function validateNameCard(value: string) {
    const words = value.split(' ');
    if (words.length < 2) {
      setErrorMesageNameCard('Name must contain at least 2 words');
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\s]+$/)) {
      setErrorMesageNameCard('Name contains invalid characters');
      return false;
    }
    return true;
  }

  function validateNumderCard(value: string) {
    if (value.length < 16) {
      setErrorMesageNumberCard('Number card invalid length');
      return false;
    }
    return true;
  }

  function validateDateCard(value: string) {
    const month = Number(value.substring(0, 2));
    const year = Number(value.substring(3, 5));

    if (value.length < 4) {
      setErrorMesageDateCard('Date card invalid length');
      return false;
    } else {
      if (year < +thisYear || year > +thisYear + 5) {
        setErrorMesageDateCard('Invalid date');
        return false;
      }
      if (month >= 12) {
        setErrorMesageDateCard('Invalid date');
        return false;
      }
      if (year === +thisYear && +thisMonth >= month) {
        setErrorMesageDateCard('Invalid date');
        return false;
      }
    }
  }

  function validateCvvCard(value: string) {
    if (value.length < 3) {
      setErrorMesageCvvCard('Invalid CVV code');
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
  }

  function formatCardDate(value: string) {
    const valueDate = value.replace(/[^\d]/g, '').substring(0, 4);
    setDateCard(valueDate.match(/.{1,2}/g)?.join('/') || '');
  }

  function formatCvv(value: string) {
    setCvvCard(value.replace(/[^\d]/g, '').substring(0, 3));
  }

  function testDataClick() {
    setName('Rubi Rhod');
    setAdress('United States, New-York, Times Square');
    setEmail('Rubi_Rod@icloud.com');
    setNumberPhone('+7123456789');
    setNameCard('RUBI RHOD');
    setNumberCard('5761 8744 9011 0008');
    setDateCard('05/25');
    setCvvCard('344');
  }

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
    formatCvv(watch('cvvCard'));
  }, [watch('cvvCard')]);

  return (
    <div
      className="main-catalog__payment-page payment-page"
      onClick={handelCloseModal}
      data-id="close-modal"
    >
      <div className="payment-page__container">
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
                    {...register('address', { required: true, validate: validateAdress })}
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
      </div>
    </div>
  );
}
