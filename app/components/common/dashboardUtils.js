import { darkTheme, lightTheme } from '../../styles/designTokens';

/**
 * Pegar tema baseado no modo selecionado
 * @param {boolean} isDarkMode - Se darkMode está ativo
 * @returns {Object} Paleta de cor tema
 */
export const getThemeColors = (isDarkMode) => ({
  ...(isDarkMode ? darkTheme : lightTheme),
});

/**
 * Formatar numero utilizando dot annotation
 * @param {number} num - Numero a ser formatado
 * @returns {string} String formatada
 */
export const formatNumber = (num) =>
  num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '0';

/**
 * Conveter aproximadamente dias em meses
 * @param {number} days - Numero de dias
 * @returns {number} Numero aproximado de meses
 */
export const getMonthsFromDays = (days) => Math.round(days / 30);
