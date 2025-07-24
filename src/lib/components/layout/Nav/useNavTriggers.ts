import { useEffect } from 'react';

import { useSlideNav } from '../../../util/slides/hooks';

export function useNavTriggers() {
  const [gotoPreviousSlide, gotoNextSlide] = useSlideNav();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') gotoNextSlide();
      if (e.key === 'ArrowLeft') gotoPreviousSlide();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [gotoNextSlide, gotoPreviousSlide]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('main')) return;
      e.preventDefault();
      if (e.pageX > window.innerWidth / 2) gotoNextSlide();
      else gotoPreviousSlide();
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [gotoPreviousSlide, gotoNextSlide]);
}
