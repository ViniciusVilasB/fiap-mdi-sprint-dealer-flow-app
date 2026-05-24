import { View, ActivityIndicator, Text } from 'react-native';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function LoadingView({ themeColors }) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={themeColors.textMain} />
      <Text style={styles.emptyStateText}>
        Carregando dados do veículo...
      </Text>
    </View>
  );
}
