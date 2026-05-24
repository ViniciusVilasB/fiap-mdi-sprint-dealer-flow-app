import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import api from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

export default function Dashboard() {
  const { signOut } = useAuth();
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    inputBg: isDarkMode ? '#2C2C2C' : '#F4F5F7',
    border: isDarkMode ? '#333333' : '#E5E5E5',
    textMain: isDarkMode ? '#FFFFFF' : '#111111',
    textSub: isDarkMode ? '#AAAAAA' : '#666666',
  };
  
  // Estados para os filtros
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  
  // Estados de controle da UI (Dropdowns abertos/fechados)
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  
  // Estados de dados da API
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableModels = [
  { id: 0, modelName: 'RANGER', availableYears: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026] },
  { id: 1, modelName: 'KA', availableYears: [2018, 2019, 2020, 2021] },
  { id: 2, modelName: 'ECOSPORT', availableYears: [2017, 2019, 2020, 2021] },
  { id: 3, modelName: 'TERRITORY', availableYears: [2021, 2022, 2023, 2024, 2025, 2026] },
  { id: 4, modelName: 'BRONCO SPORT', availableYears: [2021, 2022, 2023, 2024, 2025] },
  { id: 5, modelName: 'MAVERICK', availableYears: [2022, 2023, 2024, 2025] },
  { id: 6, modelName: 'TRANSIT', availableYears: [2022, 2023, 2024, 2025, 2026] },
  { id: 7, modelName: 'F-150', availableYears: [2023, 2024, 2025] },
  { id: 8, modelName: 'MUSTANG', availableYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
  { id: 9, modelName: 'EDGE', availableYears: [2019, 2020] },
  { id: 10, modelName: 'KHC', availableYears: [2020, 2021] },
  { id: 11, modelName: 'FOCUS', availableYears: [2017, 2018, 2019] },
  { id: 12, modelName: 'BDA', availableYears: [2020, 2021] },
  { id: 13, modelName: 'FUSION/MONDEO', availableYears: [2017, 2018, 2019] },
  { id: 14, modelName: 'F-SERIES', availableYears: [2019] },
  { id: 15, modelName: 'FIESTA', availableYears: [2017, 2019] },
  { id: 16, modelName: '7BC', availableYears: [2019] }
];

  const fetchCarData = async (modelId, year) => {
    setLoading(true);
    try {
      const response = await api.get(`/car-data/${modelId}/${year}`);
      setCarData(response.data);
    } catch (error) {
      console.error('Erro na requisição:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    if (selectedModel && selectedYear) {
      fetchCarData(selectedModel.id, selectedYear);
    } else {
      setCarData(null); 
      console.warn("Selecione um modelo e um ano antes de buscar.");
    }
  };

  // Funções de seleção dos Dropdowns
  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setIsModelDropdownOpen(false);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const getMonthsFromDays = (days) => Math.round(days / 30);
  const formatNumber = (num) => num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* SEÇÃO DE FILTROS (DROPDOWNS) */}
        <View style={styles.filtersSection}>
          <Text style={[styles.pageSubtitle, { color: themeColors.textMain }]}>Selecionar Dados do Veículo</Text>

          {/* DROPDOWN DE MODELO */}
          <View style={styles.dropdownContainer}>
            <Text style={[styles.dropdownLabel, { color: themeColors.textSub }]}>Modelo do Carro</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector, 
                isModelDropdownOpen && styles.dropdownSelectorOpen,
                { backgroundColor: themeColors.inputBg, borderColor: themeColors.border }
              ]} 
              onPress={() => {
                setIsModelDropdownOpen(!isModelDropdownOpen);
                setIsYearDropdownOpen(false);
              }}
            >
              <Text style={[
                styles.dropdownText, 
                !selectedModel && styles.dropdownPlaceholder,
                { color: themeColors.textMain }
              ]}>
                {selectedModel ? selectedModel.modelName : 'Selecione um modelo...'}
              </Text>
              <Ionicons name={isModelDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color={themeColors.textMain} />
            </TouchableOpacity>

            {isModelDropdownOpen && (
              <View style={[styles.dropdownOptions, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                {availableModels.map((model) => (
                  <TouchableOpacity 
                    key={model.id} 
                    style={[styles.dropdownOptionItem, { borderBottomColor: themeColors.border }]}
                    onPress={() => handleSelectModel(model)}
                  >
                    <Text style={[
                      styles.dropdownOptionText, 
                      selectedModel?.id === model.id && styles.dropdownOptionTextActive,
                      { color: themeColors.textMain }
                    ]}>
                      {model.modelName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* DROPDOWN DE ANO */}
          <View style={[styles.dropdownContainer, !selectedModel && { opacity: 0.5 }]}>
            <Text style={[styles.dropdownLabel, { color: themeColors.textSub }]}>Ano</Text>
            <TouchableOpacity 
              style={[
                styles.dropdownSelector, 
                isYearDropdownOpen && styles.dropdownSelectorOpen,
                { backgroundColor: themeColors.inputBg, borderColor: themeColors.border }
              ]} 
              onPress={() => {
                if (selectedModel) {
                  setIsYearDropdownOpen(!isYearDropdownOpen);
                  setIsModelDropdownOpen(false);
                }
              }}
              disabled={!selectedModel}
            >
              <Text style={[
                styles.dropdownText, 
                !selectedYear && styles.dropdownPlaceholder,
                { color: themeColors.textMain }
              ]}>
                {selectedYear ? selectedYear : 'Selecione o ano...'}
              </Text>
              <Ionicons name={isYearDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color={themeColors.textMain} />
            </TouchableOpacity>

            {isYearDropdownOpen && selectedModel && (
              <View style={[styles.dropdownOptions, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                {selectedModel.availableYears.map((year) => (
                  <TouchableOpacity 
                    key={year} 
                    style={[styles.dropdownOptionItem, { borderBottomColor: themeColors.border }]}
                    onPress={() => handleSelectYear(year)}
                  >
                    <Text style={[
                      styles.dropdownOptionText, 
                      selectedYear === year && styles.dropdownOptionTextActive,
                      { color: themeColors.textMain }
                    ]}>
                      {year}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.searchButton, 
              (!selectedModel || !selectedYear) && styles.searchButtonDisabled
            ]}
            onPress={handleSearchClick}
            disabled={!selectedModel || !selectedYear}
          >
            <Text style={styles.searchButtonText}>Buscar Dados</Text>
          </TouchableOpacity>
        </View>
        
        {/* LOADING INDICATOR */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={[styles.emptyStateText, { color: themeColors.textSub }]}>Selecione um modelo e ano acima para visualizar o painel de análise.</Text>
          </View>
        )}

        {/* DASHBOARD CARD */}
        {!loading && carData && (
          <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.carName, { color: themeColors.textMain }]}>{carData.modelName || selectedModel.modelName}</Text>
                <Text style={styles.carYear}>{carData.year || selectedYear}</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Ao Vivo</Text>
              </View>
            </View>

            {/* TOP SERVICES */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>PRINCIPAIS SERVIÇOS</Text>
              {carData.topServices?.map((service, index) => (
                <View key={service.serviceCode} style={styles.serviceItem}>
                  <View style={styles.serviceTextRow}>
                    <Text style={[styles.serviceText, { color: themeColors.textMain }]} numberOfLines={2}>
                      {index + 1}. {service.serviceDescription}
                    </Text>
                    <Text style={styles.serviceValue}>{service.count}</Text>
                  </View>
                  <View style={[styles.serviceBar, { width: `${100 - (index * 20)}%` }]} />
                </View>
              ))}
            </View>

            {/* APPOINTMENT TYPE */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>TIPO DE AGENDAMENTO</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressGreen, { width: `${carData.scheduledPercentage}%` }]}>
                  {carData.scheduledPercentage > 10 && (
                    <Text style={styles.progressText}>{carData.scheduledPercentage}%</Text>
                  )}
                </View>
                <View style={[styles.progressYellow, { width: `${carData.notScheduledPercentage}%` }]}>
                  {carData.notScheduledPercentage > 10 && (
                    <Text style={styles.progressText}>{carData.notScheduledPercentage}%</Text>
                  )}
                </View>
              </View>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#00D05A' }]} />
                  <Text style={styles.legendText}>Agendado</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#FFB800' }]} />
                  <Text style={styles.legendText}>Sem Agendamento</Text>
                </View>
              </View>
            </View>

            {/* MAINTENANCE INTERVALS */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>INTERVALOS DE MANUTENÇÃO (MODA)</Text>
              <View style={styles.intervalsRow}>
                <View style={styles.intervalBox}>
                  <Ionicons name="speedometer-outline" size={24} color="#FF6B00" />
                  <View style={styles.intervalTextContainer}>
                    <Text style={styles.intervalMainText}>{formatNumber(carData.modeKMLastVisit)} km</Text>
                    <Text style={styles.intervalSubText}>Intervalo em KM</Text>
                  </View>
                </View>
                <View style={styles.intervalBox}>
                  <Ionicons name="calendar-outline" size={24} color="#00C48C" />
                  <View style={styles.intervalTextContainer}>
                    <Text style={styles.intervalMainText}>~{getMonthsFromDays(carData.modeDaysLastVisit)} meses</Text>
                    <Text style={styles.intervalSubText}>{carData.modeDaysLastVisit} dias</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* TOTAL COUNT */}
            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>Total de Registros</Text>
              <Text style={[styles.footerValue, { color: themeColors.textMain }]}>{formatNumber(carData.count)}</Text>
            </View>
          </View>
        )}

        {/* MENSAGEM INICIAL */}
        {!loading && !carData && (
          <View style={styles.emptyStateContainer}>
             <Ionicons name="car-outline" size={48} color="#D0D0D0" />
             <Text style={[styles.emptyStateText, { color: themeColors.textSub }]}>Selecione um modelo e ano acima para visualizar o painel de análise.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0' 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { backgroundColor: '#000', padding: 6, borderRadius: 6, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  headerActions: { flexDirection: 'row', gap: 10 },
  iconButton: { padding: 6, backgroundColor: '#F5F5F5', borderRadius: 8, marginLeft: 8 },
  scrollContent: { padding: 20 },
  
  filtersSection: { marginBottom: 25 },
  pageSubtitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 15 },
  dropdownContainer: { marginBottom: 15 },
  dropdownLabel: { fontSize: 12, fontWeight: '700', color: '#888', marginBottom: 6, textTransform: 'uppercase' },
  dropdownSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F4F5F7', borderWidth: 1, borderColor: '#E5E5E5', padding: 14, borderRadius: 10 },
  dropdownSelectorOpen: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderColor: '#000' },
  dropdownText: { fontSize: 16, color: '#111' },
  dropdownPlaceholder: { color: '#999' },
  dropdownOptions: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E5E5', borderTopWidth: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, overflow: 'hidden' },
  dropdownOptionItem: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  dropdownOptionText: { fontSize: 16, color: '#333' },
  dropdownOptionTextActive: { fontWeight: 'bold', color: '#000' },
  
  loadingContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  loadingText: { marginTop: 15, color: '#666', fontSize: 14 },
  emptyStateContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  emptyStateText: { marginTop: 15, color: '#888', fontSize: 14, textAlign: 'center', lineHeight: 20 },

  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E5E5', padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  carName: { fontSize: 20, fontWeight: 'bold', color: '#111', textTransform: 'capitalize' },
  carYear: { fontSize: 16, color: '#666', marginTop: 2 },
  badgeContainer: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#00C48C', fontSize: 12, fontWeight: 'bold' },
  
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#888', letterSpacing: 0.5, marginBottom: 12, textTransform: 'uppercase' },
  serviceItem: { marginBottom: 12 },
  serviceTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  serviceText: { fontSize: 14, color: '#111', fontWeight: '500', textTransform: 'capitalize', flex: 1 },
  serviceValue: { fontSize: 14, color: '#888', fontWeight: '500' },
  serviceBar: { height: 4, backgroundColor: '#111', borderRadius: 2 },
  progressBarContainer: { flexDirection: 'row', height: 28, borderRadius: 14, overflow: 'hidden', marginBottom: 10 },
  progressGreen: { backgroundColor: '#00D05A', justifyContent: 'center', alignItems: 'center' },
  progressYellow: { backgroundColor: '#FFB800', justifyContent: 'center', alignItems: 'center' },
  progressText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  legendContainer: { flexDirection: 'row', gap: 15 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: '#666' },
  intervalsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  intervalBox: { flex: 1, flexDirection: 'row', backgroundColor: '#F4F5F7', borderRadius: 10, padding: 12, alignItems: 'center' },
  intervalTextContainer: { marginLeft: 10 },
  intervalMainText: { fontSize: 14, fontWeight: 'bold', color: '#111' },
  intervalSubText: { fontSize: 12, color: '#666', marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 15, marginTop: 5 },
  footerLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  footerValue: { fontSize: 16, fontWeight: 'bold', color: '#111' },

  searchButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  searchButtonDisabled: {
    backgroundColor: '#888',
  },
  searchButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});