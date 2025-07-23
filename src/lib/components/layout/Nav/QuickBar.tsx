import type { Dispatch } from 'react';

import { useHasNextSlide, useHasPrevSlide, useSlideNav } from '../../../util/slides/hooks';
import { MuiIcon } from '../../common/MuiIcon';
import clsx from 'clsx';

interface BarProps {
  open?: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export function QuickBar({ open, setOpen }: BarProps) {
  const hasPrev = useHasPrevSlide();
  const hasNext = useHasNextSlide();
  const [gotoPrevSlide, gotoNextSlide] = useSlideNav();

  return (
    <div
      className={clsx(
        'flex items-center justify-between transition-all',
        open ? '*:pointer-events-none' : '*:pointer-events-auto',
        {
          '-translate-y-full opacity-0': open,
        },
      )}
      inert={open}
    >
      <ArrowButton
        className="pr-0.5"
        disabled={!hasPrev}
        iconName="chevron_left"
        onClick={() => gotoPrevSlide()}
      />
      <button
        className="cursor-pointer p-2 text-slate-300 hover:text-slate-50"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        aria-label="Open slide navigator"
      >
        <div className="flex items-center justify-center border border-current rounded-full bg-cyan-950 outline-cyan-950 outline-3">
          <MuiIcon name="more_horiz" className="w-10 h-5 leading-5! block overflow-hidden" />
        </div>
      </button>
      <ArrowButton
        className="pl-0.5"
        disabled={!hasNext}
        iconName="chevron_right"
        onClick={() => gotoNextSlide()}
      />
    </div>
  );
}

interface ArrowButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconClass?: string;
  iconName: 'chevron_right' | 'chevron_left';
}
function ArrowButton({ className, disabled, iconClass, iconName, onClick }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
          e.preventDefault();
          onClick?.();
        }
      }}
      disabled={disabled}
      className={clsx(
        'cursor-pointer text-slate-300 pointer-events-auto p-2',
        'disabled:text-slate-400 disabled:cursor-default',
      )}
    >
      <div
        className={clsx(
          'bg-cyan-950',
          'border-2 rounded-full w-8 h-6 flex items-center justify-center',
          'border-current',
          className,
        )}
      >
        <MuiIcon name={iconName} className={iconClass} />
      </div>
    </button>
  );
}
