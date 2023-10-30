import { useEffect } from 'react';
// import { FormDataSignUP, FormDataPayment } from '@/types/types';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

type Helper = {
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
};

export function useFormsInputsHelper({ watch, setValue }: Helper) {
  useEffect(() => {
    setValue('formSignUP.name', watch('formSignUP.name')?.substring(0, 40));
  }, [watch('formSignUP.name')]);

  useEffect(() => {
    setValue('formSignUP.email', watch('formSignUP.email')?.substring(0, 70));
  }, [watch('formSignUP.email')]);

  useEffect(() => {
    setValue('formSignUP.password', watch('formSignUP.password')?.substring(0, 50));
  }, [watch('formSignUP.email')]);

  useEffect(() => {
    setValue('formPayment.address', watch('formPayment.address')?.substring(0, 70));
  }, [watch('formPayment.address')]);

  useEffect(() => {
    setValue(
      'formPayment.phone',
      watch('formPayment.phone')
        ?.replace(/[^\d+]/g, '')
        .substring(0, 16)
    );
  }, [watch('formPayment.phone')]);

  useEffect(() => {
    setValue('formPayment.nameCard', watch('formPayment.nameCard')?.substring(0, 40));
  }, [watch('formPayment.nameCard')]);

  useEffect(() => {
    const valueNumber =
      watch('formPayment.numberCard')
        ?.replace(/[^\d]/g, '')
        .substring(0, 16)
        .match(/.{1,4}/g)
        ?.join(' ') || '';
    setValue('formPayment.numberCard', valueNumber);
  }, [watch('formPayment.numberCard')]);

  useEffect(() => {
    const valueDate =
      watch('formPayment.dateCard')
        ?.replace(/[^\d]/g, '')
        .substring(0, 4)
        .match(/.{1,2}/g)
        ?.join('/') || '';
    setValue('formPayment.dateCard', valueDate);
  }, [watch('formPayment.dateCard')]);

  useEffect(() => {
    setValue(
      'formPayment.cvvCard',
      watch('formPayment.cvvCard')?.replace(/[^\d]/g, '').substring(0, 3)
    );
  }, [watch('formPayment.cvvCard')]);
}
