export const sizes = {
  iconSmall: 16,
  icon: 20,
  iconLarge: 24,
  iconHero: 48,
  logo: 30,
  logoLarge: 100,
  headerButton: 36,
  input: 48,
  dropdownModel: 200,
  dropdownDealer: 250,
  menu: 130,
} as const;

export type SizeKey = keyof typeof sizes;
