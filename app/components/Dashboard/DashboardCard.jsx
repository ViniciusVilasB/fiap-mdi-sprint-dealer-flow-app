import { View, Text } from 'react-native';
import { formatNumber } from '../common/dashboardUtils';
import { createDashboardStyles } from '../common/dashboardStyles';
import TopServicesSection from './TopServicesSection';
import AppointmentTypeSection from './AppointmentTypeSection';
import MaintenanceIntervalsSection from './MaintenanceIntervalsSection';

export default function DashboardCard({
  carData,
  selectedModel,
  selectedYear,
  themeColors,
}) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={[styles.card]}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.carName}>
            {carData.modelName || selectedModel?.modelName}
          </Text>
          <Text style={styles.carYear}>
            {carData.year || selectedYear}
          </Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>Ao Vivo</Text>
        </View>
      </View>

      {/* Top Services Section */}
      <TopServicesSection 
        services={carData.topServices} 
        themeColors={themeColors}
      />

      {/* Appointment Type Section */}
      <AppointmentTypeSection
        scheduledPercentage={carData.scheduledPercentage}
        notScheduledPercentage={carData.notScheduledPercentage}
        themeColors={themeColors}
      />

      {/* Maintenance Intervals Section */}
      <MaintenanceIntervalsSection
        kmLastVisit={carData.modeKMLastVisit}
        daysLastVisit={carData.modeDaysLastVisit}
        themeColors={themeColors}
      />

      {/* Card Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.footerLabel}>Total de Registros</Text>
        <Text style={styles.footerValue}>
          {formatNumber(carData.count)}
        </Text>
      </View>
    </View>
  );
}
