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

/**
 * Risco de manutencao nos proximos 60 dias, com o rotulo e as cores de cada faixa
 */
export const RISK_PRESENTATION = Object.freeze({
  good: { label: 'Baixo', colorKey: 'success', surfaceKey: 'successSurface' },
  warning: { label: 'Médio', colorKey: 'warning', surfaceKey: 'warningSurface' },
  bad: { label: 'Alto', colorKey: 'errorStrong', surfaceKey: 'errorSurfaceSoft' },
});

/**
 * Converter o propensity score da API em porcentagem.
 * O score JA E a porcentagem de manutencao em 60 dias (base observada:
 * 0.59% a 54.78%, mediana 4.6%). Apenas limitamos ao intervalo valido
 * para nunca exibir um percentual fora de 0 a 100.
 * @param {number} score - Propensity score retornado pela API
 * @returns {number} Porcentagem de 0 a 100
 */
export const toPercentage = (score) => {
  const value = Number(score);
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), 100);
};

/**
 * Formatar a porcentagem de manutencao com 2 casas decimais
 * @param {number} score - Propensity score retornado pela API
 * @returns {string} String formatada, ex.: '1.27'
 */
export const formatPercentage = (score) => toPercentage(score).toFixed(2);

/**
 * Formatar o propensity score bruto com 4 casas decimais
 * @param {number} score - Propensity score retornado pela API
 * @returns {string} String formatada
 */
export const formatScore = (score) => {
  const value = Number(score);
  return Number.isFinite(value) ? value.toFixed(4) : '0.0000';
};

/**
 * Classificar o risco a partir da porcentagem de manutencao em 60 dias.
 * Faixas: Baixo abaixo de 15%, Medio de 15% a 30%, Alto acima de 30%.
 * @param {number} percentage - Porcentagem de 0 a 100
 * @returns {'good'|'warning'|'bad'} Faixa de risco
 */
export const getRiskLevel = (percentage) => {
  if (percentage >= 30) return 'bad';
  if (percentage >= 15) return 'warning';
  return 'good';
};
