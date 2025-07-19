import { type ReactNode, useId } from 'react';

interface Props {
  tooltip: ReactNode;
  children: ReactNode;
}
export function Tooltip({ tooltip, children }: Props) {
  const id = useId();
  return (
    <>
      <button popoverTarget={id}>{children}</button>
      <div
        id={id}
        className="
          fixed m-auto max-h-4/5 rounded-xl
          py-4
          backdrop:backdrop-blur-xs backdrop:backdrop-saturate-50
          bg-gradient-to-br from-cyan-950 to-purple-950
        "
        popover="auto"
      >
        {tooltip}
      </div>
    </>
  );
}
