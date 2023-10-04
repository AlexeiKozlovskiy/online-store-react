import { BalancerCategory, BalancerCollection, BalancerColor } from '@/components/types/types';

export function setStorage(
  key: string,
  value:
    | string[]
    | number[]
    | BalancerCategory[]
    | BalancerColor[]
    | BalancerCollection[]
    | [number | null, number | null]
) {
  sessionStorage.setItem(`${key}`, JSON.stringify(value));
}
