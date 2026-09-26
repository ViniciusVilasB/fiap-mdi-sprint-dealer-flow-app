import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useAuth } from '../contexts/AuthContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'; // IMPORT ADICIONADO
import iconDealer from '../../assets/dealer_nav_icon.png'; 
import iconCar from '../../assets/car_nav_icon.png'; 
import { AuthView } from '../auth/AuthView'; 
import { PERMISSIONS } from '../auth/permissions'; 
import { borders, colors, radii, sizes, spacing, typography, shadows, getTheme } from '../styles/designTokens';

function LayoutContent() {
  const router = useRouter();
  const { logout } = useAuth();

  const { isDarkMode, setIsDarkMode } = useTheme();
  
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const handleLogout = () => {
    setIsUserMenuVisible(false);
    if (logout) {
      logout();
    }
  };

  const themeColors = getTheme(isDarkMode);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      
      {/* HEADER */}
      <View style={[styles.headerContainer, { backgroundColor: themeColors.headerFooter }]}>
        <View style={styles.titleSection}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>DealerFlow</Text>
        </View>

        <View style={styles.headerIconsContainer}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: themeColors.iconBg }]} 
            onPress={() => setIsDarkMode(!isDarkMode)}
            activeOpacity={0.7}>
            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={sizes.icon} color={themeColors.text} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: themeColors.iconBg }]} 
              onPress={() => setIsUserMenuVisible(!isUserMenuVisible)}
              activeOpacity={0.7}>
              <Ionicons name="exit-outline" size={sizes.icon} color={themeColors.text} />
            </TouchableOpacity>
            {isUserMenuVisible && (
              <View style={[styles.dropdownMenu, { backgroundColor: themeColors.menuBg }]}>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={sizes.icon} color={colors.errorStrong} />
                  <Text style={[styles.menuItemText, { color: colors.errorStrong }]}>Deslogar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        <Slot /> 
      </View>

      {/* FOOTER */}
      <View style={[styles.footerContainer, { backgroundColor: themeColors.headerFooter }]}>
        <AuthView permission={PERMISSIONS.ACCESS_DEALER}>
          <TouchableOpacity
            style={styles.footerTab}
            onPress={() => router.push('/')}
          >
            <Image source={iconDealer} style={[styles.logoImage, { tintColor: themeColors.text }]} />
            <Text style={[styles.footerTabText, { color: themeColors.text }]}>Mecânicas</Text>
          </TouchableOpacity>
        </AuthView>

        <AuthView permission={PERMISSIONS.ACCESS_CAR_MODEL_DATA}>
          <TouchableOpacity
            style={styles.footerTab}
            onPress={() => router.push('/dashboard')}
          >
            <Image source={iconCar} style={[styles.logoImage, { tintColor: themeColors.text }]} />
            <Text style={[styles.footerTabText, { color: themeColors.text }]}>Carros</Text>
          </TouchableOpacity>
        </AuthView>

        <AuthView permission={PERMISSIONS.VIEW_ANALYTICS}>
          <TouchableOpacity
            style={styles.footerTab}
            onPress={() => router.push('/consult')}
          >
            <Ionicons name="pulse-outline" size={sizes.logo} color={themeColors.text} />
            <Text style={[styles.footerTabText, { color: themeColors.text }]}>Previsão</Text>
          </TouchableOpacity>
        </AuthView>
      </View>

    </SafeAreaView>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

const styles = {
  safeArea: { flex: 1, paddingTop: spacing.xl },
  mainContent: { flex: 1, paddingVertical: spacing.xl },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xxxl, paddingVertical: spacing.xl, zIndex: 10, borderBottomWidth: borders.thin, borderBottomColor: colors.border },
  titleSection: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl },
  logoImage: { width: sizes.logo, height: sizes.logo, resizeMode: 'contain' },
  headerTitle: { fontSize: typography.xl, fontWeight: '700' },
  headerIconsContainer: { flexDirection: 'row', gap: spacing.xl, alignItems: 'center' },
  iconButton: { width: sizes.headerButton, height: sizes.headerButton, borderRadius: sizes.headerButton / 2, justifyContent: 'center', alignItems: 'center' },
  dropdownMenu: { position: 'absolute', top: sizes.headerButton + spacing.xl, right: 0, borderRadius: radii.lg, paddingVertical: spacing.lg, paddingHorizontal: spacing.xl, minWidth: sizes.menu, ...shadows.menu, borderStyle: 'solid', borderWidth: borders.thin, borderColor: colors.border },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: spacing.xl, paddingVertical: spacing.md },
  menuItemText: { fontSize: typography.lg, fontWeight: '600' },
  footerContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: spacing.xxxl, borderTopWidth: borders.thin, borderTopColor: colors.border },
  footerTab: { alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.lg },
  footerTabText: { fontSize: typography.body, fontWeight: '500' },
};