import { useEffect } from 'react';
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
    setValue('formSignUP.login', watch('formSignUP.login')?.substring(0, 40));
  }, [watch('formSignUP.login')]);

  useEffect(() => {
    setValue('formSignUP.email', watch('formSignUP.email')?.substring(0, 70));
  }, [watch('formSignUP.email')]);

  useEffect(() => {
    setValue('formSignUP.password', watch('formSignUP.password')?.substring(0, 50));
  }, [watch('formSignUP.email')]);

  useEffect(() => {
    setValue('formProfile.address', watch('formProfile.address')?.substring(0, 70));
  }, [watch('formProfile.address')]);

  useEffect(() => {
    setValue(
      'formProfile.phone',
      watch('formProfile.phone')
        ?.replace(/[^\d+]/g, '')
        .substring(0, 16)
    );
  }, [watch('formProfile.phone')]);

  useEffect(() => {
    setValue('formProfile.nameCard', watch('formProfile.nameCard')?.substring(0, 40));
  }, [watch('formProfile.nameCard')]);

  useEffect(() => {
    const valueNumber =
      watch('formProfile.numberCard')
        ?.replace(/[^\d]/g, '')
        .substring(0, 16)
        .match(/.{1,4}/g)
        ?.join(' ') || '';
    setValue('formProfile.numberCard', valueNumber);
  }, [watch('formProfile.numberCard')]);

  useEffect(() => {
    const valueDate =
      watch('formProfile.dateCard')
        ?.replace(/[^\d]/g, '')
        .substring(0, 4)
        .match(/.{1,2}/g)
        ?.join('/') || '';
    setValue('formProfile.dateCard', valueDate);
  }, [watch('formProfile.dateCard')]);

  useEffect(() => {
    setValue(
      'formProfile.cvvCard',
      watch('formProfile.cvvCard')?.replace(/[^\d]/g, '').substring(0, 3)
    );
  }, [watch('formProfile.cvvCard')]);
}
