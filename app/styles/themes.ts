import { colors } from './colors';

export const lightTheme = {
  background: colors.surface,
  surface: colors.surface,
  inputBg: colors.surfaceMuted,
  border: colors.border,
  textMain: colors.text,
  textSub: colors.textMuted,
  headerFooter: colors.surface,
  text: colors.primaryDark,
  iconBg: colors.iconBackground,
  menuBg: colors.surface,
} as const;

export const darkTheme = {
  background: colors.darkBackground,
  surface: colors.surfaceDark,
  inputBg: colors.inputDark,
  border: colors.borderDark,
  textMain: colors.textOnDark,
  textSub: colors.darkTextMuted,
  headerFooter: colors.surfaceDark,
  text: colors.primarySoft,
  iconBg: colors.borderDark,
  menuBg: colors.inputDark,
} as const;

export type ThemeColors = {
  [Key in keyof typeof lightTheme]: string;
};

export const getTheme = (isDarkMode: boolean): ThemeColors =>
  isDarkMode ? darkTheme : lightTheme;
