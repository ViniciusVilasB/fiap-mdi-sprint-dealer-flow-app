export const radii = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 10,
  card: 12,
  panel: 16,
  pill: 999,
} as const;

export type RadiusKey = keyof typeof radii;
