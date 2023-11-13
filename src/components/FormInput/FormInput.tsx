import './FormInput.scss';
import { InputComponents } from '@/types/types';

export function FormInput({
  id,
  register,
  registerType,
  errors,
  isValid,
  placeholder,
  className,
  type,
  validate,
  errorDefinitions,
}: InputComponents) {
  return (
    <div>
      <input
        placeholder={placeholder}
        className={`formInput ${className && className} ${errors && 'invalid'} ${
          isValid && 'valid'
        }`}
        type={type}
        id={id}
        {...register(registerType, {
          required: true,
          validate,
        })}
      />
      {errors && errorDefinitions[errors]}
    </div>
  );
}
