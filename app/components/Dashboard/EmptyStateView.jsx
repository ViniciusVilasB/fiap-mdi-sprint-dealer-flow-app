import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function EmptyStateView({ themeColors }) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="car-outline" size={48} color="#D0D0D0" />
      <Text style={styles.emptyStateText}>
        Selecione um modelo e ano acima para visualizar o painel de análise.
      </Text>
    </View>
  );
}
