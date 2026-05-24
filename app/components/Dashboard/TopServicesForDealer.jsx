import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function TopServicesForDealer({ 
  services, 
  themeColors 
}) {
  const styles = createDashboardStyles(themeColors);

  if (!services || services.length === 0) {
    return null;
  }
  const getServiceStatus = (averageHours, globalAverageHours) => {
    if (averageHours < globalAverageHours) return 'good';
    if (averageHours > globalAverageHours) return 'bad';
    return 'neutral';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#00D05A';
      case 'bad':
        return '#FF4444';
      default:
        return '#FFB800';
    }
  };

  const getProgressPercentage = (averageHours, globalAverageHours) => {
    if (globalAverageHours === 0) return 0;
    const percentage = (averageHours / globalAverageHours) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>PRINCIPAIS SERVIÇOS</Text>
      {services.map((service, index) => {
        const status = getServiceStatus(service.averageHours, service.globalAverageHours);
        const statusColor = getStatusColor(status);
        const progressPercentage = getProgressPercentage(service.averageHours, service.globalAverageHours);

        return (
          <View key={service.serviceCode} style={styles.serviceItem}>
            <View style={styles.serviceTextRow}>
              <View style={{ flex: 1 }}>
                <Text 
                  style={[styles.serviceText]} 
                  numberOfLines={2}
                >
                  #{index + 1} {service.serviceDescription}
                </Text>
              </View>
            </View>
            <View style={[styles.serviceTextRow, { marginBottom: 8 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons 
                  name="time-outline" 
                  size={16} 
                  color={statusColor} 
                />
                <Text style={[styles.serviceValue, { color: statusColor, fontWeight: 'bold' }]}>
                  {service.averageHours}h média
                </Text>
              </View>
              <Text style={[styles.serviceValue, { color: themeColors.textSub }]}>
                Global ~{service.globalAverageHours}h
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressGreen, 
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: statusColor 
                  }
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
