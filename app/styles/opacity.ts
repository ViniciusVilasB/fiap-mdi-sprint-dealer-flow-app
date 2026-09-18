export const opacity = {
  disabled: 0.5,
  subtle: 0.1,
  soft: 0.25,
} as const;

export type OpacityKey = keyof typeof opacity;
