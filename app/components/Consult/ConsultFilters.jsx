import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDashboardStyles } from '../common/dashboardStyles';
import Button from '../common/Button';
import { colors, sizes } from '../../styles/designTokens';

export default function ConsultFilters({
  searchTypes,
  searchType,
  searchValue,
  onSearchTypeSelect,
  onChangeValue,
  onSearch,
  isTypeDropdownOpen,
  onTypeDropdownToggle,
  isInputFocused,
  onFocusInput,
  isLoading,
  themeColors,
}) {
  const styles = createDashboardStyles(themeColors);
  const isHashSearch = searchType === 'VIN_Hash';

  return (
    <View style={styles.filtersSection}>
      <Text style={styles.pageSubtitle}>Previsão de Manutenção</Text>
      <Text style={styles.pageCaption}>
        Probabilidade de o veículo precisar de manutenção nos próximos 60 dias.
      </Text>

      {/* DROPDOWN DE TIPO DE CONSULTA */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Tipo de Consulta</Text>
        <TouchableOpacity
          style={[
            styles.dropdownSelector,
            isTypeDropdownOpen && styles.dropdownSelectorOpen,
          ]}
          onPress={() => onTypeDropdownToggle(!isTypeDropdownOpen)}
          disabled={isLoading}
        >
          <Text style={styles.dropdownText}>
            {searchTypes.find((option) => option.value === searchType)?.label ?? ''}
          </Text>
          <Ionicons
            name={isTypeDropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={themeColors.textMain}
          />
        </TouchableOpacity>

        {isTypeDropdownOpen && !isLoading && (
          <View style={styles.dropdownOptions}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: sizes.dropdownModel }}>
              {searchTypes.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.dropdownOptionItem}
                  onPress={() => {
                    onSearchTypeSelect(option.value);
                    onTypeDropdownToggle(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      searchType === option.value &&
                        styles.dropdownOptionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* INPUT DE CONSULTA */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>
          {isHashSearch ? 'VIN Hash' : searchType === 'MaintenanceID' ? 'ID de Manutenção' : 'ID do Registro'}
        </Text>
        <TextInput
          style={[
            styles.input,
            isInputFocused && styles.inputFocused,
            !isHashSearch && { fontWeight: '600' },
          ]}
          placeholder={isHashSearch ? 'Cole o VIN Hash do veículo...' : 'Digite o ID...'}
          placeholderTextColor={colors.textSubtle}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={isHashSearch ? 'default' : 'numeric'}
          editable={!isLoading}
          onChangeText={onChangeValue}
          onFocus={() => onFocusInput(true)}
          onBlur={() => onFocusInput(false)}
          onSubmitEditing={onSearch}
          returnKeyType="search"
          maxLength={isHashSearch ? 64 : 15}
        />
      </View>

      <Button
        style={styles.searchButton}
        onPress={onSearch}
        disabled={!searchValue.trim() || isLoading}
        loading={isLoading}
      >
        Consultar
      </Button>
    </View>
  );
}
