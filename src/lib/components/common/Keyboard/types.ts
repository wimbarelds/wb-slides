import type { CSSProperties, ReactNode } from 'react';
export type TKey = null | string;

type vwCallback = (ratio: number) => string;

export interface TKeys {
  keys: Array<TKey | TKey[] | TKeys>;
  style?: (vw: vwCallback) => CSSProperties;
  className?: string;
}

export interface KeyStuff {
  style?: CSSProperties;
  className?: string;
  content: ReactNode;
}

export interface KeyboardContext {
  highlight?: string[];
  onClick?: (key: string) => void;
  baseKeySize?: number;
}
