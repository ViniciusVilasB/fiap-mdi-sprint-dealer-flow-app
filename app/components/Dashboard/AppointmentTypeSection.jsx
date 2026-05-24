import { View, Text } from 'react-native';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function AppointmentTypeSection({ 
  scheduledPercentage, 
  notScheduledPercentage, 
  themeColors 
}) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>TIPO DE AGENDAMENTO</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressGreen, { width: `${scheduledPercentage}%` }]}>
          {scheduledPercentage > 10 && (
            <Text style={styles.progressText}>{scheduledPercentage}%</Text>
          )}
        </View>
        <View style={[styles.progressYellow, { width: `${notScheduledPercentage}%` }]}>
          {notScheduledPercentage > 10 && (
            <Text style={styles.progressText}>{notScheduledPercentage}%</Text>
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
  );
}
