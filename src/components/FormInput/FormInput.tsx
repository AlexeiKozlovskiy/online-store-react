import './FormInput.scss';
import { InputComponents } from '@/types/types';

export function FormInput({
  id,
  name,
  register,
  registerType,
  errors,
  isValid,
  placeholder,
  className,
  type,
  disabled,
  required,
  validate,
  errorDefinitions,
}: InputComponents) {
  return (
    <div className="formInput">
      {name && (
        <label className="formInput__name" htmlFor={id}>
          {name}
        </label>
      )}
      <input
        placeholder={placeholder}
        className={`formInput__input ${className && className} ${errors && 'invalid'} ${
          isValid && 'valid'
        }`}
        type={type}
        id={id}
        disabled={disabled}
        {...register(registerType, {
          required: required === false ? false : true,
          validate,
        })}
      />
      {errors && errorDefinitions[errors]}
    </div>
  );
}
