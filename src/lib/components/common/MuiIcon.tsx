import clsx from 'clsx';

interface Props {
  name: string;
  accessibleText?: string;
  className?: string;
}

export function MuiIcon({ name, accessibleText, className }: Props) {
  return (
    <span className={clsx('material-symbols-outlined', className)} aria-label={accessibleText}>
      {name}
    </span>
  );
}
