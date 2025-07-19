import type { CSSProperties } from 'react';

import { keyWidths } from './consts';
import type { KeyStuff } from './types';

export const vw = (baseKeySize: number, ratio: number) => `${baseKeySize * ratio}vw`;

function size(baseKeySize: number, ratio = 1, height = baseKeySize): CSSProperties {
  return {
    height: `${height}vw`,
    width: `${height * ratio}vw`,
  };
}

export function getContent(key: string) {
  if (key.startsWith('r')) return key.slice(1);
  if (['Win', 'Fn', 'Ctx'].includes(key)) return '';
  if (key.startsWith('kp')) return key.slice(2);

  const doubles: Record<string, string> = {
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    '/': '?',
  };

  if (key in doubles) {
    return (
      <div>
        <div>{doubles[key]}</div>
        <div>{key}</div>
      </div>
    );
  }
  return key;
}

export function getKeyStuff(baseKeySize: number, key: string): KeyStuff {
  if (key === 'null') {
    return {
      style: { ...size(baseKeySize), opacity: 0.5 },
      content: null,
    };
  }

  if (key in keyWidths) {
    return {
      style: {
        ...size(baseKeySize, keyWidths[key as keyof typeof keyWidths]),
        borderRadius: vw(baseKeySize, 0.1),
        outlineOffset: vw(baseKeySize, -0.05),
      },
      content: getContent(key),
      className: 'outline',
    };
  }

  if (['kp+', 'kpEnter'].includes(key)) {
    return {
      style: {
        ...size(baseKeySize, 0.5, baseKeySize * 2),
        right: 0,
        borderRadius: vw(baseKeySize, 0.1),
        outlineOffset: vw(baseKeySize, -0.05),
      },
      content: getContent(key),
      className: 'outline absolute',
    };
  }

  return {
    style: {
      ...size(baseKeySize),
      borderRadius: vw(baseKeySize, 0.1),
      outlineOffset: vw(baseKeySize, -0.05),
    },
    content: getContent(key),
    className: 'outline',
  };
}
