import { View, ActivityIndicator, Text } from 'react-native';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function ConsultLoadingView({ themeColors }) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={themeColors.textMain} />
      <Text style={styles.emptyStateText}>
        Consultando previsão de manutenção...
      </Text>
    </View>
  );
}
