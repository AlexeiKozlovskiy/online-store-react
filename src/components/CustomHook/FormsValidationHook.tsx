import { useState } from 'react';
import { FormErrorMessages, FORM_MESSAGES, ErrorType } from '@/types/types';
import { thisYear, thisMonth } from '@/helpers/helpersFunc';

export function useFormsValidation() {
  const [formErrors, setFormErrors] = useState<FormErrorMessages>({
    msgName: null,
    msgEmail: null,
    msgPassword: null,
    msgAdress: null,
    msgPhone: null,
    msgNameCard: null,
    msgNumberCard: null,
    msgDateCard: null,
    msgCvvCard: null,
  });

  function validateName(value?: string) {
    if (!value) return;
    const words = value.split(' ');
    if (words.length < 2 || !words.every((el) => el.length >= 1)) {
      setFormErrors({ msgName: FORM_MESSAGES.NAME_CONTAINS_TWO_WORDS });
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\.\s]+$/)) {
      setFormErrors({ msgName: FORM_MESSAGES.NAME_CONTAINS_INVALID_CHARACTERS });
      return false;
    }
  }

  function validateEmail(value?: string) {
    if (!value) return;
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setFormErrors({ msgEmail: FORM_MESSAGES.INVALID_EMAIL });
      return false;
    }
  }

  function validatePassword(value?: string) {
    if (!value) return;
    if (!value.match(/^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/)) {
      setFormErrors({ msgPassword: FORM_MESSAGES.INVALID_PASSWORD });
      return false;
    }
  }

  function validateAddress(value?: string) {
    if (!value) return;
    const words = value.split(' ');
    if (words.length < 3 || !words.every((el) => el.length >= 1)) {
      setFormErrors({ msgAdress: FORM_MESSAGES.ADDRESS_CONTAINS_THREE_WORDS });
      return false;
    }
  }

  function validatePhone(value?: string) {
    if (!value) return;
    if (value.length <= 6) {
      setFormErrors({ msgPhone: FORM_MESSAGES.PHONE_LENGTH });
      return false;
    }
  }

  function validateNameCard(value?: string) {
    if (!value) return;
    const words = value.split(' ');
    if (words.length < 2) {
      setFormErrors({ msgNameCard: FORM_MESSAGES.NAME_CONTAINS_TWO_WORDS });
      return false;
    }
    if (!value.match(/^[a-zA-Zа-яА-Я\s]+$/)) {
      setFormErrors({ msgNameCard: FORM_MESSAGES.NAME_CONTAINS_INVALID_CHARACTERS });
      return false;
    }
  }

  function validateNumderCard(value?: string) {
    if (!value) return;
    if (value.length < 19) {
      setFormErrors({ msgNumberCard: FORM_MESSAGES.CARD_NUMBER_LENGTH });
      return false;
    }
  }

  function validateDateCard(value?: string) {
    if (!value) return;
    const month = +value.substring(0, 2);
    const year = +value.substring(3, 5);

    if (value.length < 4) {
      setFormErrors({ msgDateCard: FORM_MESSAGES.CARD_DATE_LENGTH });
      return false;
    } else {
      if (year < +thisYear || year > +thisYear + 5) {
        setFormErrors({ msgDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
      if (month >= 12) {
        setFormErrors({ msgDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
      if (year === +thisYear && +thisMonth >= month) {
        setFormErrors({ msgDateCard: FORM_MESSAGES.INVALID_CARD_DATE });
        return false;
      }
    }
  }

  function validateCvvCard(value?: string) {
    if (!value) return;
    if (value.length < 3) {
      setFormErrors({ msgCvvCard: FORM_MESSAGES.INVALID_CARD_CVV });
      return false;
    }
  }

  const errorDefinitions: Record<string, Record<ErrorType, JSX.Element>> = {
    name: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NAME),
      validate: ErrorMessage(formErrors.msgName!),
    },
    email: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_EMAIL),
      validate: ErrorMessage(formErrors.msgEmail!),
    },
    password: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_PASSWORD),
      validate: ErrorMessage(formErrors.msgPassword!),
    },
    address: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_ADDRESS),
      validate: ErrorMessage(formErrors.msgAdress!),
    },
    phone: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_PHONE),
      validate: ErrorMessage(formErrors.msgPhone!),
    },
    nameCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NAME_CARD),
      validate: ErrorMessage(formErrors.msgNameCard!),
    },
    numberCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_NUMBER_CARD),
      validate: ErrorMessage(formErrors.msgNumberCard!),
    },
    dateCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_DATE_CARD),
      validate: ErrorMessage(formErrors.msgDateCard!),
    },
    cvvCard: {
      required: ErrorMessage(FORM_MESSAGES.ENTER_CVV_CARD),
      validate: ErrorMessage(formErrors.msgCvvCard!),
    },
  };

  function ErrorMessage(message: string) {
    return <div className="error-message">{message}</div>;
  }

  return {
    validateName,
    validateEmail,
    validatePassword,
    validateAddress,
    validatePhone,
    validateNameCard,
    validateNumderCard,
    validateDateCard,
    validateCvvCard,
    errorDefinitions,
  };
}
