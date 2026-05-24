import { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { router } from 'expo-router';
import api from '../services/api';
import { getThemeColors } from '../components/common/dashboardUtils';
import { createDashboardStyles } from '../components/common/dashboardStyles';
import VehicleFilters from '../components/Dashboard/VehicleFilters';
import DashboardCard from '../components/Dashboard/DashboardCard';
import EmptyStateView from '../components/Dashboard/EmptyStateView';
import LoadingView from '../components/Dashboard/LoadingView';

export default function Dashboard() {
  const { signOut } = useAuth();
  const { isDarkMode } = useTheme();
  const themeColors = getThemeColors(isDarkMode);
  const styles = createDashboardStyles(themeColors);

  // Filter state
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // UI state (dropdowns)
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  // API state
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

  // API call to fetch car data
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

  // Handler for search button
  const handleSearchClick = () => {
    if (selectedModel && selectedYear) {
      fetchCarData(selectedModel.id, selectedYear);
    } else {
      setCarData(null);
      console.warn('Selecione um modelo e um ano antes de buscar.');
    }
  };

  // Handler for model selection
  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setSelectedYear(null);
  };

  // Handler for year selection
  const handleSelectYear = (year) => {
    setSelectedYear(year);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Vehicle Filters Component */}
        <VehicleFilters
          selectedModel={selectedModel}
          selectedYear={selectedYear}
          onModelSelect={handleSelectModel}
          onYearSelect={handleSelectYear}
          onSearch={handleSearchClick}
          availableModels={availableModels}
          isModelDropdownOpen={isModelDropdownOpen}
          isYearDropdownOpen={isYearDropdownOpen}
          onModelDropdownToggle={setIsModelDropdownOpen}
          onYearDropdownToggle={setIsYearDropdownOpen}
          themeColors={themeColors}
        />

        {/* Loading State */}
        {loading && <LoadingView themeColors={themeColors} />}

        {/* Dashboard Card with Data */}
        {!loading && carData && (
          <DashboardCard
            carData={carData}
            selectedModel={selectedModel}
            selectedYear={selectedYear}
            themeColors={themeColors}
          />
        )}

        {/* Empty State */}
        {!loading && !carData && <EmptyStateView themeColors={themeColors} />}
      </ScrollView>
    </SafeAreaView>
  );
}
