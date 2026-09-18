export const typography = {
  xs: 12,
  sm: 13,
  body: 14,
  md: 15,
  lg: 16,
  xl: 20,
  title: 22,
  display: 28,
} as const;

export type TypographyKey = keyof typeof typography;
