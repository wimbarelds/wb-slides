export const defaultBaseKeySize = 3.9;

export const keyWidths = {
  Backspace: 2,
  Tab: 1.5,
  ['\\']: 1.5, // The '\' key above Enter
  ['Caps Lock']: 1.75,
  Enter: 2.25,
  Shift: 2.25,
  rShift: 2.75,
  Control: 1.25,
  Win: 1.25, // Windows or Command key
  Alt: 1.25,
  Space: 6.25,
  rAlt: 1.25,
  Fn: 1.25,
  Ctx: 1.25,
  rControl: 1.25,
  kp0: 2,
} as const satisfies Readonly<Record<string, number>>;
