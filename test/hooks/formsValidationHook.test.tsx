import { describe, expect, it } from 'vitest';
import { useFormsValidation } from '@/hooks/FormsValidationHook';
import { act, renderHook } from '@testing-library/react';

describe('useFormsValidation', () => {
  it('should validate name', () => {
    const { result } = renderHook(() => useFormsValidation());
    act(() => {
      expect(result.current.validateName('')).toBe(false);
      expect(result.current.validateName('Rubi')).toBe(false);
      expect(result.current.validateName('Rubi123')).toBe(false);
      expect(result.current.validateName('Rubi_')).toBe(false);
      expect(result.current.validateName('Rubi Ro@!')).toBe(false);

      expect(result.current.validateName('Rubi Rod')).toBe(true);
    });
  });

  it('should validate login', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateLogin('')).toBe(false);
      expect(result.current.validateLogin('rub')).toBe(false);
      expect(result.current.validateLogin('rub@122')).toBe(false);

      expect(result.current.validateLogin('rub123')).toBe(true);
      expect(result.current.validateLogin('rubi')).toBe(true);
    });
  });

  it('should validate email', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateEmail('')).toBe(false);
      expect(result.current.validateEmail('test@example')).toBe(false);
      expect(result.current.validateEmail('test@example.')).toBe(false);
      expect(result.current.validateEmail('test@example.comcom')).toBe(false);
      expect(result.current.validateEmail('testexample.com')).toBe(false);

      expect(result.current.validateEmail('test@example.com')).toBe(true);
    });
  });

  it('should validate password', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validatePassword('')).toBe(false);
      expect(result.current.validatePassword('1234')).toBe(false);
      expect(result.current.validatePassword('ab12')).toBe(false);
      expect(result.current.validatePassword('abcdefg')).toBe(false);

      expect(result.current.validatePassword('abcdefg123')).toBe(true);
    });
  });

  it('should validate address', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateAddress('')).toBe(false);
      expect(result.current.validateAddress('Minsk')).toBe(false);
      expect(result.current.validateAddress('Minsk, Kozlova')).toBe(false);
      expect(result.current.validateAddress('Minsk, Kozlova 2')).toBe(false);

      expect(result.current.validateAddress('Minsk, Kozlova 2, 108')).toBe(true);
    });
  });

  it('should validate phone', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validatePhone('')).toBe(false);
      expect(result.current.validatePhone('12345')).toBe(false);

      expect(result.current.validatePhone('1234567')).toBe(true);
    });
  });

  it('should validate name card', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateNameCard('')).toBe(false);
      expect(result.current.validateNameCard('Rubi')).toBe(false);
      expect(result.current.validateNameCard('Rubi123')).toBe(false);
      expect(result.current.validateNameCard('Rubi_')).toBe(false);
      expect(result.current.validateNameCard('Rubi Ro@!')).toBe(false);

      expect(result.current.validateNameCard('Rubi Rod')).toBe(true);
    });
  });

  it('should validate number card', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateNumderCard('')).toBe(false);
      expect(result.current.validateNumderCard('2222')).toBe(false);
      expect(result.current.validateNumderCard('22223333')).toBe(false);
      expect(result.current.validateNumderCard('222233334444')).toBe(false);
      expect(result.current.validateNumderCard('222233334444555d')).toBe(false);
      expect(result.current.validateNumderCard('2222 3333 4444 555')).toBe(false);

      expect(result.current.validateNumderCard('2222 3333 4444 5555')).toBe(true);
    });
  });

  it('should validate date card', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateDateCard('')).toBe(false);
      expect(result.current.validateDateCard('12')).toBe(false);
      expect(result.current.validateDateCard('13/25')).toBe(false);
      expect(result.current.validateDateCard('00/24')).toBe(false);
      expect(result.current.validateDateCard('05/31')).toBe(false);
      expect(result.current.validateDateCard('05/22')).toBe(false);

      expect(result.current.validateDateCard('10/25')).toBe(true);
    });
  });

  it('should validate cvv card', () => {
    const { result } = renderHook(() => useFormsValidation());

    act(() => {
      expect(result.current.validateCvvCard('')).toBe(false);
      expect(result.current.validateCvvCard('12')).toBe(false);

      expect(result.current.validateCvvCard('123')).toBe(true);
    });
  });
});
