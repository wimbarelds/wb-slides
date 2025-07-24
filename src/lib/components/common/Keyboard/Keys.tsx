import clsx from 'clsx';

import { useKeyboardContext } from './context';
import { vw } from './helper';
import { Key } from './Key';
import type { TKeys } from './types';

export function Keys({ keys, style, className }: TKeys) {
  const { baseKeySize } = useKeyboardContext();
  return (
    <div style={style?.((ratio) => vw(baseKeySize, ratio))} className={clsx('flex', className)}>
      {keys.map((key, index) => {
        if (Array.isArray(key)) {
          return <Keys key={index} keys={key} />;
        }
        if (typeof key === 'object' && key && 'keys' in key) {
          return <Keys key={index} keys={key.keys} style={key.style} className={key.className} />;
        }
        return <Key key={index} value={key} />;
      })}
    </div>
  );
}
