import { defaultBaseKeySize } from './consts';
import { KeyboardContextProvider } from './context';
import { vw } from './helper';
import { keyboardKeys } from './keyboard-keys';
import { Keys } from './Keys';
import type { KeyboardContext } from './types';

export function Keyboard({
  baseKeySize = defaultBaseKeySize,
  highlight,
  onClick,
}: KeyboardContext) {
  return (
    <div
      className="not-prose relative w-max outline p-3 rounded-md"
      style={{ fontSize: vw(baseKeySize, 0.25) }}
    >
      <div className="relative w-max">
        <KeyboardContextProvider value={{ highlight, onClick, baseKeySize }}>
          <Keys keys={keyboardKeys} className="flex-col" />
        </KeyboardContextProvider>
      </div>
    </div>
  );
}
