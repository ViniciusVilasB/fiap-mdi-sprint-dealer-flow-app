import { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import ConsultService, { buildConsultPath } from '../services/ConsultService';
import { logger } from '../utils/logger';
import { getThemeColors } from '../components/common/dashboardUtils';
import { createDashboardStyles } from '../components/common/dashboardStyles';
import { colors, sizes } from '../styles/designTokens';
import ConsultFilters from '../components/Consult/ConsultFilters';
import PropensityCard from '../components/Consult/PropensityCard';
import ConsultEmptyStateView from '../components/Consult/ConsultEmptyStateView';
import ConsultLoadingView from '../components/Consult/ConsultLoadingView';

// Cada tipo de busca usa uma base diferente:
//   ID            -> PK do registro de dados
//   MaintenanceID -> PK do registro de manutencao
//   VIN_Hash      -> hash que identifica o veiculo
const SEARCH_TYPES = [
  { value: 'ID', label: 'ID do Registro' },
  { value: 'MaintenanceID', label: 'ID de Manutenção' },
  { value: 'VIN_Hash', label: 'VIN Hash' },
];

const ID_REGEX = /^\d+$/;
const HASH_REGEX = /^[a-fA-F0-9]{64}$/;

// Mensagens por status, conforme o contrato real observado na API.
const mapConsultError = (status, isNetworkError, searchType) => {
  if (isNetworkError) return 'Não foi possível conectar ao serviço de previsão.';
  if (status === 400) return 'Consulta inválida. Revise o valor informado.';
  if (status === 401) return 'Sua sessão expirou. Faça login novamente.';
  if (status === 404) {
    return searchType === 'MaintenanceID'
      ? 'Nenhuma manutenção encontrada para este ID.'
      : 'Não encontramos este veículo no modelo preditivo.';
  }
  if (status >= 500) return 'O serviço de previsão está indisponível no momento.';
  return 'Não foi possível consultar a previsão. Tente novamente.';
};

export default function Consult() {
  const { isDarkMode } = useTheme();
  const themeColors = getThemeColors(isDarkMode);
  const styles = createDashboardStyles(themeColors);

  // Filter state
  const [searchType, setSearchType] = useState(SEARCH_TYPES[0].value);
  const [searchValue, setSearchValue] = useState('');
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // API state
  const [consultData, setConsultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API call para buscar a previsão de manutenção
  const fetchPropensity = async (type, value) => {
    const url = buildConsultPath(type, value);
    logger.info(`Consultando ${url}`);

    setLoading(true);
    setError(null);
    try {
      // Atenção: o ConsultService já devolve o corpo da resposta (padrão de
      // DealerService/AuthService). Não desestruturar de novo aqui, ou o
      // resultado vira `undefined` e a tela cai no estado vazio sem erro.
      let data;
      if (type === 'MaintenanceID') {
        data = await ConsultService.byMaintenanceId(value);
      } else if (type === 'VIN_Hash') {
        data = await ConsultService.byVinHash(value);
      } else {
        data = await ConsultService.byId(value);
      }

      // Resposta inesperada não pode passar silenciosa como "sem resultados".
      if (!data || typeof data !== 'object') {
        logger.error('Resposta inesperada do serviço de previsão', data);
        setError('Resposta inesperada do serviço de previsão.');
        setConsultData(null);
        return;
      }

      logger.info(`Resposta recebida em ${url}`);
      setConsultData(data);
    } catch (err) {
      const status = err?.status ?? 0;
      logger.error(`Consulta falhou (${status}) em ${url}`, err?.serverMessage);
      setError(mapConsultError(status, err?.isNetworkError, type));
      setConsultData(null);
    } finally {
      setLoading(false);
    }
  };

  // Handler do botão de consulta
  const handleSearchClick = () => {
    logger.info('Consulta acionada pelo usuario');
    const normalizedValue = searchValue.trim();

    if (!normalizedValue) {
      setConsultData(null);
      return setError('Informe o valor para realizar a consulta.');
    }

    if (searchType === 'VIN_Hash') {
      if (!HASH_REGEX.test(normalizedValue)) {
        setConsultData(null);
        return setError('O VIN Hash deve ter 64 caracteres hexadecimais.');
      }
    } else if (!ID_REGEX.test(normalizedValue)) {
      setConsultData(null);
      return setError('O ID deve conter apenas números.');
    }

    fetchPropensity(searchType, normalizedValue);
  };

  // Handler de troca do tipo de consulta
  const handleSearchTypeSelect = (type) => {
    setSearchType(type);
    setSearchValue('');
    setConsultData(null);
    setError(null);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Filtros de consulta */}
        <ConsultFilters
          searchTypes={SEARCH_TYPES}
          searchType={searchType}
          searchValue={searchValue}
          onSearchTypeSelect={handleSearchTypeSelect}
          onChangeValue={(value) => {
            setSearchValue(value);
            if (error) setError(null);
          }}
          onSearch={handleSearchClick}
          isTypeDropdownOpen={isTypeDropdownOpen}
          onTypeDropdownToggle={setIsTypeDropdownOpen}
          isInputFocused={isInputFocused}
          onFocusInput={setIsInputFocused}
          isLoading={loading}
          themeColors={themeColors}
        />

        {/* Mensagem de erro */}
        {error && (
          <View style={styles.feedbackContainer}>
            <Ionicons name="warning-outline" size={sizes.icon} color={colors.errorStrong} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Carregando */}
        {loading && <ConsultLoadingView themeColors={themeColors} />}

        {/* Card com o resultado */}
        {!loading && consultData && (
          <PropensityCard
            consultData={consultData}
            searchValue={searchValue.trim()}
            themeColors={themeColors}
          />
        )}

        {/* Estado vazio */}
        {!loading && !consultData && !error && (
          <ConsultEmptyStateView themeColors={themeColors} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
