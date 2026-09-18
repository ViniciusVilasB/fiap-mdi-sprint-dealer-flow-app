export const spacing = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
  xxxl: 15,
  section: 20,
  page: 24,
  card: 32,
  control: 48,
} as const;

export type SpacingKey = keyof typeof spacing;
