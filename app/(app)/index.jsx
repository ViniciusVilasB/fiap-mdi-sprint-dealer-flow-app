import { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import { getThemeColors } from '../components/common/dashboardUtils';
import { createDashboardStyles } from '../components/common/dashboardStyles';
import DealerSelector from '../components/Dashboard/DealerSelector';
import TopServicesForDealer from '../components/Dashboard/TopServicesForDealer';

export default function Dealers() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const themeColors = getThemeColors(isDarkMode);
  const styles = createDashboardStyles(themeColors);

  const [selectedDealer, setSelectedDealer] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [dealerData, setDealerData] = useState(null);
  const [isDealerDropdownOpen, setIsDealerDropdownOpen] = useState(false);
  const [isLoadingDealers, setIsLoadingDealers] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const initializeDealers = async () => {
      try {
        setIsLoadingDealers(true);
        setError(null);

        if (user?.role === 'MANAGER' && user?.dealer) {
          setSelectedDealer(user.dealer);
          setDealers([user.dealer]);
          await fetchDealerData(user.dealer);
        } else {

          const response = await api.get('/dealer');
          const dealerList = Array.isArray(response.data) ? response.data : response.data.dealers || [];
          setDealers(dealerList);

          if (dealerList.length > 0) {
            setSelectedDealer(dealerList[0]);
            await fetchDealerData(dealerList[0]);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar mecânicas:', err);
        setError('Erro ao carregar mecânicas. Tente novamente.');
      } finally {
        setIsLoadingDealers(false);
      }
    };

    initializeDealers();
  }, []);

  const fetchDealerData = async (dealerCode) => {
    try {
      setIsLoadingData(true);
      setError(null);
      const response = await api.get(`/dealer/${dealerCode}`);
      setDealerData(response.data);
    } catch (err) {
      console.error('Erro ao carregar dados da mecânica:', err);
      setError('Erro ao carregar dados. Tente novamente.');
      setDealerData(null);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDealerSelect = (dealerCode) => {
    setSelectedDealer(dealerCode);
    fetchDealerData(dealerCode);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageSubtitle}>Gestão de Mecânicas</Text>

        {dealers.length > 1 && (
          <DealerSelector
            selectedDealer={selectedDealer}
            dealers={dealers}
            onDealerSelect={handleDealerSelect}
            isOpen={isDealerDropdownOpen}
            onToggle={setIsDealerDropdownOpen}
            themeColors={themeColors}
            isLoading={isLoadingDealers}
          />
        )}

        {error && (
          <View style={[styles.card, { backgroundColor: '#FFE5E5', borderColor: '#FF4444' }]}>
            <Text style={{ color: '#FF4444', fontWeight: 'bold' }}>
              ⚠️ {error}
            </Text>
          </View>
        )}

        {isLoadingData && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={themeColors.textMain} />
            <Text style={styles.emptyStateText}>Carregando dados da mecânica...</Text>
          </View>
        )}

        {!isLoadingData && dealerData && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.carName}>Mecânica {selectedDealer}</Text>
              </View>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Ao Vivo</Text>
              </View>
            </View>

            <TopServicesForDealer 
              services={dealerData.topServices} 
              themeColors={themeColors}
            />
          </View>
        )}

        {!isLoadingData && !dealerData && !error && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              Nenhuma mecânica selecionada
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}