export const borders = {
  none: 0,
  thin: 1,
  medium: 2,
} as const;

export type BorderKey = keyof typeof borders;
