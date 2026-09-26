import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDashboardStyles } from '../common/dashboardStyles';
import { colors, sizes } from '../../styles/designTokens';

export default function ConsultEmptyStateView({ themeColors }) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="pulse-outline" size={sizes.iconHero} color={colors.placeholder} />
      <Text style={styles.emptyStateText}>
        Consulte um ID ou VIN Hash acima para visualizar a previsão de manutenção.
      </Text>
    </View>
  );
}
