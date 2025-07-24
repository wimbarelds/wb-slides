import clsx from 'clsx';
import { type Dispatch, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';

import { useSlides } from '../../../util/slides';
import { useNavIndeces } from '../../../util/slides/hooks';

interface SlideNavProps {
  open?: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function SlideNav({ open, setOpen }: SlideNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const slides = useSlides();
  const [currentTopicIndex, currentSlideIndex] = useNavIndeces();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [open, setOpen]);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    if (!open) return;

    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    mainEl.inert = true;

    return () => {
      mainEl.inert = false;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.querySelector<HTMLAnchorElement>('a[data-current="true"]')?.focus();
    }
  }, [open]);

  return (
    <nav
      ref={navRef}
      inert={!open}
      aria-hidden={!open}
      aria-label="Slide navigation"
      className={clsx('transition-all duration-400 relative z-20', {
        'opacity-0 -translate-y-full': !open,
      })}
    >
      <ul className="flex justify-center -mx-4" aria-label="Topics">
        {slides.map((topic, topicIndex) => (
          <li className="w-34 flex flex-col" key={topicIndex} aria-label={topic.title}>
            <Link
              to={topic.path}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (e.target instanceof HTMLElement) e.target.blur();
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(topic.path);
                  setOpen(false);
                }
              }}
              className="
                h-16 flex items-center justify-center text-center border p-1 rounded mx-2 mb-4
                py-2.5 leading-[1.2] bg-slate-100/75 text-black font-bold px-2
                transition hover:bg-slate-200 pointer-events-auto
              "
            >
              {topic.title}
            </Link>
            <ul className="flex flex-col items-stretch gap-4 px-2">
              {topic.slides.map((item, slideIndex) => {
                const isActive =
                  topicIndex === currentTopicIndex && slideIndex === currentSlideIndex;
                return (
                  <li key={slideIndex}>
                    <Link
                      to={item.path}
                      data-current={isActive ? 'true' : 'false'}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          if (e.target instanceof HTMLElement) e.target.blur();
                          e.preventDefault();
                          e.stopPropagation();
                          navigate(item.path);
                          setOpen(false);
                        }
                      }}
                      onClick={(e) => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                        e.stopPropagation();
                        setOpen(false);
                      }}
                      className={clsx(
                        'p-1 rounded transition hover:scale-105 w-full py-2.5 leading-[1.2] opacity-75 bg-slate-800 block text-center pointer-events-auto focus:outline-2 outline-sky-400',
                        { 'assignment-link': item.type === 'assignment' },
                        isActive ? 'border-2' : 'border',
                        // {
                        //   [isAssignment
                        //     ? 'ring-2 ring-yellow-200 focus:ring-yellow-400'
                        //     : 'ring-sky-500 ring-4']: isActive,
                        // },
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
