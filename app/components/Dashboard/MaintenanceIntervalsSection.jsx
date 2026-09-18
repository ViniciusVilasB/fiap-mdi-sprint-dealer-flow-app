import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatNumber, getMonthsFromDays } from '../common/dashboardUtils';
import { createDashboardStyles } from '../common/dashboardStyles';
import { colors, sizes } from '../../styles/designTokens';

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
          <Ionicons name="speedometer-outline" size={sizes.iconLarge} color={colors.warningStrong} />
          <View style={styles.intervalTextContainer}>
            <Text style={styles.intervalMainText}>
              {formatNumber(kmLastVisit)} km
            </Text>
            <Text style={styles.intervalSubText}>Intervalo em KM</Text>
          </View>
        </View>
        <View style={styles.intervalBox}>
          <Ionicons name="calendar-outline" size={sizes.iconLarge} color={colors.successText} />
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
