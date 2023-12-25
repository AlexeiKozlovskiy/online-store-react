import { backScrollPosition } from '@/helpers/helpersFunc';
import { useEffect, useRef } from 'react';

export function useBackToScrollPosition() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    window.addEventListener('scroll', handleScroll);

    if (scrollPosition && +scrollPosition > 0) {
      body.style.opacity = '0';
      backScrollPosition(+scrollPosition);
    }

    function handleScroll() {
      scrollRef.current = window.scrollY;
    }

    return () => {
      sessionStorage.setItem('scrollPosition', scrollRef.current.toString());
      window.removeEventListener('scroll', handleScroll);

      setTimeout(() => {
        body.style.opacity = '100';
      }, 100);
    };
  }, []);
}
