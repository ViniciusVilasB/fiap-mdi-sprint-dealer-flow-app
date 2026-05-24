import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatNumber, getMonthsFromDays } from '../common/dashboardUtils';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function MaintenanceIntervalsSection({ 
  kmLastVisit, 
  daysLastVisit, 
  themeColors 
}) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>INTERVALOS DE MANUTENÇÃO (MODA)</Text>
      <View style={styles.intervalsRow}>
        <View style={styles.intervalBox}>
          <Ionicons name="speedometer-outline" size={24} color="#FF6B00" />
          <View style={styles.intervalTextContainer}>
            <Text style={styles.intervalMainText}>
              {formatNumber(kmLastVisit)} km
            </Text>
            <Text style={styles.intervalSubText}>Intervalo em KM</Text>
          </View>
        </View>
        <View style={styles.intervalBox}>
          <Ionicons name="calendar-outline" size={24} color="#00C48C" />
          <View style={styles.intervalTextContainer}>
            <Text style={styles.intervalMainText}>
              ~{getMonthsFromDays(daysLastVisit)} meses
            </Text>
            <Text style={styles.intervalSubText}>{daysLastVisit} dias</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
