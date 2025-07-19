import type { TKeys } from './types';

const row1: TKeys = {
  style: (vw) => ({ gap: vw(0.5), marginBottom: vw(0.5) }),
  keys: [
    {
      style: (vw) => ({ gap: vw(1) }),
      keys: [
        'Esc',
        {
          style: (vw) => ({ gap: vw(0.5) }),
          keys: ['F1,F2,F3,F4'.split(','), 'F5,F6,F7,F8'.split(','), 'F9,F10,F11,F12'.split(',')],
        },
      ],
    },
    ['Print', 'Scroll', 'Pause'],
    [null, null, null, null],
  ],
};

const row2: TKeys = {
  style: (vw) => ({ gap: vw(0.5) }),
  keys: [
    [...'`1234567890-=', 'Backspace'],
    ['Insert', 'Home', 'Pg Up'],
    ['Num Lock', 'kp/', 'kp*', 'kp-'],
  ],
};

const row3: TKeys = {
  style: (vw) => ({ gap: vw(0.5) }),
  keys: [
    ['Tab', ...'QWERTYUIOP[]\\'],
    ['Delete', 'End', 'Pg Dn'],
    ['kp7', 'kp8', 'kp9', 'kp+'],
  ],
};

const row4: TKeys = {
  style: (vw) => ({ gap: vw(0.5) }),
  keys: [
    ['Caps Lock', ..."ASDFGHJKL;'", 'Enter'],
    [null, null, null],
    ['kp4', 'kp5', 'kp6', null],
  ],
};

const row5: TKeys = {
  style: (vw) => ({ gap: vw(0.5) }),
  keys: [
    ['Shift', ...'ZXCVBNM,./', 'rShift'],
    [null, 'Up', null],
    ['kp1', 'kp2', 'kp3', 'kpEnter'],
  ],
};

const row6: TKeys = {
  style: (vw) => ({ gap: vw(0.5) }),
  keys: [
    ['Control', 'Win', 'Alt', 'Space', 'rAlt', 'Fn', 'Ctx', 'rControl'],
    ['Left', 'Down', 'Right'],
    ['kp0', 'kp.', null],
  ],
};

export const keyboardKeys = [row1, row2, row3, row4, row5, row6];
