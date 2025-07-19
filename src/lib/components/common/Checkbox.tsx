import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { cn } from '../../util/cn';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}
export function Checkbox({ show, setShow, children, className }: Props) {
  return (
    <label
      className={cn(
        'not-prose inline-flex items-baseline gap-2 rounded-md mt-2 px-3 py-1 text-sm cursor-pointer',
        className,
      )}
    >
      <input
        type="checkbox"
        className="accent-red-500 w-3 h-3 translate-y-0.5"
        checked={show}
        onChange={() => setShow((prev) => !prev)}
      />
      {children}
    </label>
  );
}
