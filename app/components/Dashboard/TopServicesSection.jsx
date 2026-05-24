import { View, Text } from 'react-native';
import { formatNumber } from '../common/dashboardUtils';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function TopServicesSection({ services, themeColors }) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>PRINCIPAIS SERVIÇOS</Text>
      {services?.map((service, index) => (
        <View key={service.serviceCode} style={styles.serviceItem}>
          <View style={styles.serviceTextRow}>
            <Text 
              style={[styles.serviceText]} 
              numberOfLines={2}
            >
              {index + 1}. {service.serviceDescription}
            </Text>
            <Text style={styles.serviceValue}>{service.count}</Text>
          </View>
          <View style={[styles.serviceBar, { width: `${100 - (index * 20)}%` }]} />
        </View>
      ))}
    </View>
  );
}
