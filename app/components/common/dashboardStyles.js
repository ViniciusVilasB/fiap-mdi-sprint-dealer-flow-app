import { StyleSheet } from 'react-native';

/**
 * Criar Style-Sheet theme-aware
 * @param {Object} themeColors - Paleta de cores
 * @returns {Object} Objeto styleSheet
 */
export const createDashboardStyles = (themeColors) =>
  StyleSheet.create({

    safeArea: { 
      flex: 1, 
      backgroundColor: themeColors.background 
    },
    scrollContent: { 
      padding: 20 
    },

    filtersSection: { 
      marginBottom: 25 
    },
    pageSubtitle: { 
      fontSize: 16, 
      fontWeight: '600', 
      color: themeColors.textMain, 
      marginBottom: 15 
    },

    dropdownContainer: { 
      marginBottom: 15 
    },
    dropdownLabel: { 
      fontSize: 12, 
      fontWeight: '700', 
      color: themeColors.textSub, 
      marginBottom: 6, 
      textTransform: 'uppercase' 
    },
    dropdownSelector: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: themeColors.inputBg, 
      borderWidth: 1, 
      borderColor: themeColors.border, 
      padding: 14, 
      borderRadius: 10 
    },
    dropdownSelectorOpen: { 
      borderBottomLeftRadius: 0, 
      borderBottomRightRadius: 0, 
      borderColor: '#000' 
    },
    dropdownText: { 
      fontSize: 16, 
      color: themeColors.textMain 
    },
    dropdownPlaceholder: { 
      color: '#999' 
    },
    dropdownOptions: { 
      backgroundColor: themeColors.surface, 
      borderWidth: 1, 
      borderColor: themeColors.border, 
      borderTopWidth: 0, 
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10, 
      overflow: 'hidden' 
    },
    dropdownOptionItem: { 
      padding: 14, 
      borderBottomWidth: 1, 
      borderBottomColor: themeColors.border 
    },
    dropdownOptionText: { 
      fontSize: 16, 
      color: themeColors.textMain 
    },
    dropdownOptionTextActive: { 
      fontWeight: 'bold', 
      color: '#000' 
    },

    searchButton: {
      backgroundColor: '#2563eb',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    searchButtonDisabled: {
      backgroundColor: '#888',
    },
    searchButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 16,
    },

    loadingContainer: { 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: 40 
    },
    emptyStateContainer: { 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: 40, 
      paddingHorizontal: 20 
    },
    emptyStateText: { 
      marginTop: 15, 
      color: themeColors.textSub, 
      fontSize: 14, 
      textAlign: 'center', 
      lineHeight: 20 
    },

    card: { 
      backgroundColor: themeColors.surface, 
      borderRadius: 12, 
      borderWidth: 1, 
      borderColor: themeColors.border, 
      padding: 20, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.05, 
      shadowRadius: 4, 
      elevation: 2 
    },
    cardHeader: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: 20 
    },
    carName: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: themeColors.textMain, 
      textTransform: 'capitalize' 
    },
    carYear: { 
      fontSize: 16, 
      color: themeColors.textSub, 
      marginTop: 2 
    },
    badgeContainer: { 
      backgroundColor: '#E8F5E9', 
      paddingHorizontal: 10, 
      paddingVertical: 4, 
      borderRadius: 12 
    },
    badgeText: { 
      color: '#00C48C', 
      fontSize: 12, 
      fontWeight: 'bold' 
    },

    section: { 
      marginBottom: 20 
    },
    sectionTitle: { 
      fontSize: 12, 
      fontWeight: '700', 
      color: themeColors.textSub, 
      letterSpacing: 0.5, 
      marginBottom: 12, 
      textTransform: 'uppercase' 
    },

    serviceItem: { 
      marginBottom: 12 
    },
    serviceTextRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: 6 
    },
    serviceText: { 
      fontSize: 14, 
      color: themeColors.textMain, 
      fontWeight: '500', 
      textTransform: 'capitalize', 
      flex: 1 
    },
    serviceValue: { 
      fontSize: 14, 
      color: themeColors.textSub, 
      fontWeight: '500' 
    },
    serviceBar: { 
      height: 4, 
      backgroundColor: themeColors.textMain, 
      borderRadius: 2 
    },

    progressBarContainer: { 
      flexDirection: 'row', 
      height: 28, 
      borderRadius: 14, 
      overflow: 'hidden', 
      marginBottom: 10 
    },
    progressGreen: { 
      backgroundColor: '#00D05A', 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    progressYellow: { 
      backgroundColor: '#FFB800', 
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    progressText: { 
      color: '#FFF', 
      fontWeight: 'bold', 
      fontSize: 12 
    },
    legendContainer: { 
      flexDirection: 'row', 
      gap: 15 
    },
    legendItem: { 
      flexDirection: 'row', 
      alignItems: 'center' 
    },
    legendDot: { 
      width: 8, 
      height: 8, 
      borderRadius: 4, 
      marginRight: 6 
    },
    legendText: { 
      fontSize: 12, 
      color: themeColors.textSub 
    },

    intervalsRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      gap: 10 
    },
    intervalBox: { 
      flex: 1, 
      flexDirection: 'row', 
      backgroundColor: themeColors.inputBg, 
      borderRadius: 10, 
      padding: 12, 
      alignItems: 'center' 
    },
    intervalTextContainer: { 
      marginLeft: 10 
    },
    intervalMainText: { 
      fontSize: 14, 
      fontWeight: 'bold', 
      color: themeColors.textMain 
    },
    intervalSubText: { 
      fontSize: 12, 
      color: themeColors.textSub, 
      marginTop: 2 
    },

    cardFooter: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderTopWidth: 1, 
      borderTopColor: themeColors.border, 
      paddingTop: 15, 
      marginTop: 5 
    },
    footerLabel: { 
      fontSize: 14, 
      color: themeColors.textSub, 
      fontWeight: '500' 
    },
    footerValue: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      color: themeColors.textMain 
    },
  });
