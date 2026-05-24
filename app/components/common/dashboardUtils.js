/**
 * Pegar tema baseado no modo selecionado
 * @param {boolean} isDarkMode - Se darkMode está ativo
 * @returns {Object} Paleta de cor tema
 */
export const getThemeColors = (isDarkMode) => ({
  background: isDarkMode ? '#121212' : '#FFFFFF',
  surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  inputBg: isDarkMode ? '#2C2C2C' : '#F4F5F7',
  border: isDarkMode ? '#333333' : '#E5E5E5',
  textMain: isDarkMode ? '#FFFFFF' : '#111111',
  textSub: isDarkMode ? '#AAAAAA' : '#666666',
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
