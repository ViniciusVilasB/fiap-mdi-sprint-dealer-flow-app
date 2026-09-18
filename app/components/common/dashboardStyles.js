import { borders, colors, radii, shadows, spacing, typography } from '../../styles/designTokens';

export const createDashboardStyles = (themeColors) =>
  ({

    safeArea: { 
      flex: 1, 
      backgroundColor: themeColors.background 
    },
    scrollContent: { 
      padding: spacing.section 
    },

    filtersSection: { 
      marginBottom: spacing.page 
    },
    pageSubtitle: { 
      fontSize: typography.lg,
      fontWeight: '600', 
      color: themeColors.textMain, 
      marginBottom: spacing.xxxl 
    },

    dropdownContainer: { 
      marginBottom: spacing.xxxl 
    },
    dropdownLabel: { 
      fontSize: typography.xs,
      fontWeight: '700', 
      color: themeColors.textSub, 
      marginBottom: spacing.md,
      textTransform: 'uppercase' 
    },
    dropdownSelector: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: themeColors.inputBg, 
      borderWidth: borders.thin,
      borderColor: themeColors.border, 
      padding: spacing.xxl,
      borderRadius: radii.xl 
    },
    dropdownSelectorOpen: { 
      borderBottomLeftRadius: radii.none,
      borderBottomRightRadius: radii.none,
      borderColor: colors.shadow 
    },
    dropdownText: { 
      fontSize: typography.lg,
      color: themeColors.textMain 
    },
    dropdownPlaceholder: { 
      color: colors.textSubtle 
    },
    dropdownOptions: { 
      backgroundColor: themeColors.surface, 
      borderWidth: borders.thin,
      borderColor: themeColors.border, 
      borderTopWidth: borders.none,
      borderBottomLeftRadius: radii.xl,
      borderBottomRightRadius: radii.xl,
      overflow: 'hidden' 
    },
    dropdownOptionItem: { 
      padding: spacing.xxl,
      borderBottomWidth: borders.thin,
      borderBottomColor: themeColors.border 
    },
    dropdownOptionText: { 
      fontSize: typography.lg,
      color: themeColors.textMain 
    },
    dropdownOptionTextActive: { 
      fontWeight: 'bold', 
      color: colors.shadow
    },

    searchButton: {
      padding: spacing.xxxl,
      marginTop: spacing.section,
    },

    loadingContainer: { 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: spacing.card 
    },
    emptyStateContainer: { 
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingVertical: spacing.card,
      paddingHorizontal: spacing.section
    },
    emptyStateText: { 
      marginTop: spacing.xxxl,
      color: themeColors.textSub,
      fontSize: typography.body,
      textAlign: 'center', 
      lineHeight: typography.xl
    },

    card: { 
      backgroundColor: themeColors.surface, 
      borderRadius: radii.card,
      borderWidth: borders.thin,
      borderColor: themeColors.border, 
      padding: spacing.section,
      ...shadows.card,
    },
    cardHeader: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      marginBottom: spacing.section 
    },
    carName: { 
      fontSize: typography.xl,
      fontWeight: 'bold', 
      color: themeColors.textMain, 
      textTransform: 'capitalize' 
    },
    carYear: { 
      fontSize: typography.lg,
      color: themeColors.textSub, 
      marginTop: spacing.xs
    },
    badgeContainer: { 
      backgroundColor: colors.successSurface,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.sm,
      borderRadius: radii.card
    },
    badgeText: { 
      color: colors.successText,
      fontSize: typography.xs,
      fontWeight: 'bold' 
    },

    section: { 
      marginBottom: spacing.section 
    },
    sectionTitle: { 
      fontSize: typography.xs,
      fontWeight: '700', 
      color: themeColors.textSub, 
      letterSpacing: 0.5,
      marginBottom: spacing.xxl,
      textTransform: 'uppercase' 
    },

    serviceItem: { 
      marginBottom: spacing.xxl 
    },
    serviceTextRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginBottom: spacing.md
    },
    serviceText: { 
      fontSize: typography.body,
      color: themeColors.textMain, 
      fontWeight: '500', 
      textTransform: 'capitalize', 
      flex: 1 
    },
    serviceValue: { 
      fontSize: typography.body,
      color: themeColors.textSub, 
      fontWeight: '500' 
    },
    serviceBar: { 
      height: spacing.sm,
      backgroundColor: themeColors.textMain, 
      borderRadius: radii.sm
    },

    progressBarContainer: { 
      flexDirection: 'row', 
      height: spacing.card,
      borderRadius: radii.pill,
      overflow: 'hidden', 
      marginBottom: spacing.xl 
    },
    progressGreen: { 
      backgroundColor: colors.success,
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    progressYellow: { 
      backgroundColor: colors.warning,
      justifyContent: 'center', 
      alignItems: 'center' 
    },
    progressText: { 
      color: colors.textOnPrimary,
      fontWeight: 'bold', 
      fontSize: typography.xs
    },
    legendContainer: { 
      flexDirection: 'row', 
      gap: spacing.xxxl 
    },
    legendItem: { 
      flexDirection: 'row', 
      alignItems: 'center' 
    },
    legendDot: { 
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: radii.md,
      marginRight: spacing.md
    },
    legendText: { 
      fontSize: typography.xs,
      color: themeColors.textSub 
    },

    intervalsRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      gap: spacing.xl 
    },
    intervalBox: { 
      flex: 1, 
      flexDirection: 'row', 
      backgroundColor: themeColors.inputBg, 
      borderRadius: radii.xl,
      padding: spacing.xxl,
      alignItems: 'center' 
    },
    intervalTextContainer: { 
      marginLeft: spacing.xl 
    },
    intervalMainText: { 
      fontSize: typography.body,
      fontWeight: 'bold', 
      color: themeColors.textMain 
    },
    intervalSubText: { 
      fontSize: typography.xs,
      color: themeColors.textSub, 
      marginTop: spacing.xs
    },

    cardFooter: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderTopWidth: borders.thin,
      borderTopColor: themeColors.border, 
      paddingTop: spacing.xxxl,
      marginTop: spacing.sm
    },
    footerLabel: { 
      fontSize: typography.body,
      color: themeColors.textSub, 
      fontWeight: '500' 
    },
    footerValue: { 
      fontSize: typography.lg,
      fontWeight: 'bold', 
      color: themeColors.textMain 
    },
  });
