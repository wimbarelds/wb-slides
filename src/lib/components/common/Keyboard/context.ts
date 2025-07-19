import { createContext, useContext } from 'react';

import { defaultBaseKeySize } from './consts';
import type { KeyboardContext } from './types';

const keyboardContext = createContext<KeyboardContext>({ baseKeySize: defaultBaseKeySize });
type KeyboardContextResult = KeyboardContext & { baseKeySize: number };

export const KeyboardContextProvider = keyboardContext.Provider;

export const useKeyboardContext = () => useContext(keyboardContext) as KeyboardContextResult;
