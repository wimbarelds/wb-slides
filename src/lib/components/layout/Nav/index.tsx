import { useEffect, useState } from 'react';

import { cn } from '../../../util/cn';
import { QuickBar } from './QuickBar';
import { SlideNav } from './SlideNav';
import { useNavTriggers } from './useNavTriggers';

export function Nav() {
  const [open, setOpen] = useState(false);

  const bgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.remove('overflow-auto');
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.add('overflow-auto');
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  useNavTriggers();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 h-full w-[100svw] px-6 py-2 pointer-events-none isolate z-20',
        {
          'before:-z-10 before:bg-slate-800 before:absolute before:inset-0 before:opacity-80 transition-opacity':
            open,
        },
      )}
    >
      <div
        onClick={bgClick}
        className={cn('absolute left-0 top-0 h-full w-[100svw] pointer-events-none -z-10', {
          'pointer-events-auto': open,
        })}
        aria-hidden="true"
      />
      <QuickBar {...{ open, setOpen }} />
      <SlideNav {...{ open, setOpen }} />
    </div>
  );
}
