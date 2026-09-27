import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  RISK_PRESENTATION,
  formatPercentage,
  formatScore,
  getRiskLevel,
  toPercentage,
} from '../common/dashboardUtils';
import { createDashboardStyles } from '../common/dashboardStyles';
import { colors, sizes } from '../../styles/designTokens';

export default function PropensityCard({ consultData, searchValue, themeColors }) {
  const styles = createDashboardStyles(themeColors);

  const percentage = toPercentage(consultData.propensity_score);
  const risk = RISK_PRESENTATION[getRiskLevel(percentage)];

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.carName}>Veículo</Text>
          <Text style={styles.carYear}>
            Registro {consultData.ID ?? searchValue}
          </Text>
        </View>
        <View
          style={[
            styles.badgeContainer,
            { backgroundColor: colors[risk.surfaceKey] },
          ]}
        >
          <Text style={[styles.badgeText, { color: colors[risk.colorKey] }]}>
            Risco {risk.label}
          </Text>
        </View>
      </View>

      {/* Seção de propensão */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROPENSÃO DE MANUTENÇÃO (60 DIAS)</Text>

        <Text style={[styles.propensityValue, { color: colors[risk.colorKey] }]}>
          {formatPercentage(consultData.propensity_score)}%
        </Text>

        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressGreen,
              { width: `${percentage}%`, backgroundColor: colors[risk.colorKey] },
            ]}
          />
        </View>

        <Text style={styles.propensityHint}>
          Propensity score: {formatScore(consultData.propensity_score)}
        </Text>
      </View>

      {/* Seção de identificação */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>IDENTIFICAÇÃO</Text>

        <View style={styles.detailRow}>
          <View style={styles.detailHeader}>
            <Ionicons
              name="pricetag-outline"
              size={sizes.iconSmall}
              color={colors.primary}
            />
            <Text style={styles.detailLabel}>ID do registro</Text>
          </View>
          <Text style={styles.detailValue}>{consultData.ID ?? 'N/D'}</Text>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailHeader}>
            <Ionicons
              name="key-outline"
              size={sizes.iconSmall}
              color={colors.successText}
            />
            <Text style={styles.detailLabel}>VIN Hash (veículo)</Text>
          </View>
          {/* Hash exibido por completo: quebra em varias linhas quando necessario. */}
          <Text style={styles.detailValueMono} selectable>
            {consultData.VIN_Hash ?? 'N/D'}
          </Text>
        </View>
      </View>

      {/* Card Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.footerLabel}>Status da Consulta</Text>
        <Text style={styles.footerValue} numberOfLines={1}>
          {consultData.status ?? 'N/D'}
        </Text>
      </View>
    </View>
  );
}
