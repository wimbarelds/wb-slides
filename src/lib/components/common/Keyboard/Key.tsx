import clsx from 'clsx';

import { useKeyboardContext } from './context';
import { getKeyStuff } from './helper';
import type { TKey } from './types';

interface KeyProps {
  value: TKey;
}

export function Key({ value }: KeyProps) {
  const { highlight, onClick, baseKeySize } = useKeyboardContext();

  if (value === null) {
    return <Key value="null" />;
  }
  const { style, className, content } = getKeyStuff(baseKeySize, value);
  const isHighlight = highlight?.includes(value);
  return (
    <button
      style={style}
      className={clsx(className, onClick ? 'hover:bg-white/10' : 'cursor-default', {
        'outline-green-400 outline-2 bg-green-400/20': isHighlight,
      })}
    >
      {content}
    </button>
  );
}
