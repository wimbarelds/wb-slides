import { cn } from '../../util/cn';

interface Props {
  name: string;
  accessibleText?: string;
  className?: string;
}

export function MuiIcon({ name, accessibleText, className }: Props) {
  return (
    <span className={cn('material-symbols-outlined', className)} aria-label={accessibleText}>
      {name}
    </span>
  );
}
