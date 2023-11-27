import { useEffect, useRef } from 'react';

export function useBackToScrollPosition() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    window.addEventListener('scroll', handleScroll);

    if (scrollPosition) {
      if (+scrollPosition > 0) {
        body.style.opacity = '0';
        setTimeout(() => {
          window.scrollTo(0, +scrollPosition);
        }, 0);
      }
    }

    function handleScroll() {
      scrollRef.current = window.scrollY;
    }

    return () => {
      sessionStorage.setItem('scrollPosition', scrollRef.current.toString());
      window.removeEventListener('scroll', handleScroll);

      setTimeout(() => {
        body.style.opacity = '100';
      }, 20);
    };
  }, []);
}
