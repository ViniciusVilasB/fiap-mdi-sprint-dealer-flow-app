import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function DealerSelector({
  selectedDealer,
  dealers,
  onDealerSelect,
  isOpen,
  onToggle,
  themeColors,
  isLoading,
}) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>Selecionar Distribuidora</Text>
      <TouchableOpacity
        style={[
          styles.dropdownSelector,
          isOpen && styles.dropdownSelectorOpen,
        ]}
        onPress={() => !isLoading && onToggle(!isOpen)}
        disabled={isLoading}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedDealer && styles.dropdownPlaceholder,
          ]}
        >
          {isLoading
            ? 'Carregando distribuidoras...'
            : selectedDealer
            ? selectedDealer
            : 'Selecione uma distribuidora...'}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={themeColors.textMain}
        />
      </TouchableOpacity>

      {isOpen && !isLoading && (
        <View style={styles.dropdownOptions}>
          <ScrollView nestedScrollEnabled style={{ maxHeight: 250 }}>
            {dealers?.map((dealer) => (
              <TouchableOpacity
                key={dealer}
                style={styles.dropdownOptionItem}
                onPress={() => {
                  onDealerSelect(dealer);
                  onToggle(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    selectedDealer === dealer && styles.dropdownOptionTextActive,
                  ]}
                >
                  {dealer}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
