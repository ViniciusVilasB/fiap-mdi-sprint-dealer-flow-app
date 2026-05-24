import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDashboardStyles } from '../common/dashboardStyles';

export default function VehicleFilters({
  selectedModel,
  selectedYear,
  onModelSelect,
  onYearSelect,
  onSearch,
  availableModels,
  isModelDropdownOpen,
  isYearDropdownOpen,
  onModelDropdownToggle,
  onYearDropdownToggle,
  themeColors,
}) {
  const styles = createDashboardStyles(themeColors);

  return (
    <View style={styles.filtersSection}>
      <Text style={styles.pageSubtitle}>Selecionar Dados do Veículo</Text>

      {/* DROPDOWN DE MODELO */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Modelo do Carro</Text>
        <TouchableOpacity
          style={[
            styles.dropdownSelector,
            isModelDropdownOpen && styles.dropdownSelectorOpen,
          ]}
          onPress={() => {
            onModelDropdownToggle(!isModelDropdownOpen);
            onYearDropdownToggle(false);
          }}
        >
          <Text
            style={[
              styles.dropdownText,
              !selectedModel && styles.dropdownPlaceholder,
            ]}
          >
            {selectedModel ? selectedModel.modelName : 'Selecione um modelo...'}
          </Text>
          <Ionicons
            name={isModelDropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={themeColors.textMain}
          />
        </TouchableOpacity>

        {isModelDropdownOpen && (
          <View style={styles.dropdownOptions}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
              {availableModels.map((model) => (
                <TouchableOpacity
                  key={model.id}
                  style={styles.dropdownOptionItem}
                  onPress={() => {
                    onModelSelect(model);
                    onModelDropdownToggle(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      selectedModel?.id === model.id &&
                        styles.dropdownOptionTextActive,
                    ]}
                  >
                    {model.modelName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* DROPDOWN DE ANO */}
      <View
        style={[
          styles.dropdownContainer,
          !selectedModel && { opacity: 0.5 },
        ]}
      >
        <Text style={styles.dropdownLabel}>Ano</Text>
        <TouchableOpacity
          style={[
            styles.dropdownSelector,
            isYearDropdownOpen && styles.dropdownSelectorOpen,
          ]}
          onPress={() => {
            if (selectedModel) {
              onYearDropdownToggle(!isYearDropdownOpen);
              onModelDropdownToggle(false);
            }
          }}
          disabled={!selectedModel}
        >
          <Text
            style={[
              styles.dropdownText,
              !selectedYear && styles.dropdownPlaceholder,
            ]}
          >
            {selectedYear ? selectedYear : 'Selecione o ano...'}
          </Text>
          <Ionicons
            name={isYearDropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={themeColors.textMain}
          />
        </TouchableOpacity>

        {isYearDropdownOpen && selectedModel && (
          <View style={styles.dropdownOptions}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 200 }}>
              {selectedModel.availableYears.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={styles.dropdownOptionItem}
                  onPress={() => {
                    onYearSelect(year);
                    onYearDropdownToggle(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      selectedYear === year && styles.dropdownOptionTextActive,
                    ]}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.searchButton,
          (!selectedModel || !selectedYear) && styles.searchButtonDisabled,
        ]}
        onPress={onSearch}
        disabled={!selectedModel || !selectedYear}
      >
        <Text style={styles.searchButtonText}>Buscar Dados</Text>
      </TouchableOpacity>
    </View>
  );
}
