import { useState, useEffect } from 'react';

interface IUseAnimations {
  quantity: number;
  stock: number;
}

export function useAnimations({ quantity, stock }: IUseAnimations) {
  const [shakeAnim, setShakeAnim] = useState(false);

  useEffect(() => {
    if (quantity === stock) {
      setShakeAnim(true);
      setTimeout(() => {
        setShakeAnim(false);
      }, 3500);
    }
  }, [quantity, stock]);
  return shakeAnim;
}
