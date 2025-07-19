import type { ReactNode } from 'react';

import { cn } from '../../util/cn';
import { MuiIcon } from './MuiIcon';

interface Props {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  prose?: boolean;
}

export function Collapse({ title, children, className, prose }: Props) {
  return (
    <details
      className={cn(
        'group rounded-lg border px-4 py-2 border-gray-700/50 bg-gray-950/50 open:border-gray-700/50 open:bg-gray-950/50',
        { ['not-prose']: !prose },
        className,
      )}
    >
      <summary className="flex items-center gap-3 leading-6 font-semibold select-none list-none not-prose">
        <MuiIcon name="chevron_right" className="group-open:rotate-90 transition-transform" />
        {title}
      </summary>
      {children}
    </details>
  );
}
