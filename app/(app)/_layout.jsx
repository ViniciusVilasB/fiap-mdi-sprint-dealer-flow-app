import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useAuth } from '../contexts/AuthContext';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'; // IMPORT ADICIONADO
import iconDashboard from '../../assets/dealer_nav_icon.png'; 
import { AuthView } from '../auth/AuthView'; 
import { PERMISSIONS } from '../auth/permissions'; 

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

  const themeColors = {
    background: isDarkMode ? '#121212' : '#F7F7F7', 
    headerFooter: isDarkMode ? '#1E1E1E' : '#FFFFFF', 
    text: isDarkMode ? '#FFFFFF' : '#1A1A1A',
    iconBg: isDarkMode ? '#333333' : '#E8E8E8', 
    menuBg: isDarkMode ? '#2C2C2C' : '#FFFFFF',
  };

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
            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={20} color={themeColors.text} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: themeColors.iconBg }]} 
              onPress={() => setIsUserMenuVisible(!isUserMenuVisible)}
              activeOpacity={0.7}>
              <Ionicons name="exit-outline" size={20} color={themeColors.text} />
            </TouchableOpacity>
            {isUserMenuVisible && (
              <View style={[styles.dropdownMenu, { backgroundColor: themeColors.menuBg }]}>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={18} color="#ff4444" />
                  <Text style={[styles.menuItemText, { color: '#ff4444' }]}>Deslogar</Text>
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
            onPress={() => router.push('/dashboard')}
          >
            <Image source={iconDashboard} style={[styles.logoImage, { tintColor: themeColors.text }]} />
            <Text style={[styles.footerTabText, { color: themeColors.text }]}>Dashboard</Text>
          </TouchableOpacity>
        </AuthView>

        <AuthView permission={PERMISSIONS.ACCESS_CAR_MODEL_DATA}>
          <TouchableOpacity
            style={styles.footerTab}
            onPress={() => router.push('/cars')}
          >
            <Ionicons name="car-sport" size={24} color={themeColors.text} />
            <Text style={[styles.footerTabText, { color: themeColors.text }]}>Cars</Text>
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

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: 10 },
  mainContent: { flex: 1, paddingVertical: 10 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, zIndex: 10, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  titleSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  
  logoImage: { width: 36, height: 36, resizeMode: 'contain' }, 
  
  headerTitle: { fontSize: 20, fontWeight: '700' },
  headerIconsContainer: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  iconButton: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  dropdownMenu: { position: 'absolute', top: 40, right: 0, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10, minWidth: 130, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 5, borderStyle: 'solid', borderWidth: 1, borderColor: '#E8E8E8' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  menuItemText: { fontSize: 16, fontWeight: '600' },
  footerContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 15, borderTopWidth: 1, borderTopColor: '#E8E8E8' },
  footerTab: { alignItems: 'center', gap: 2, paddingVertical: 8 },
  footerTabText: { fontSize: 14, fontWeight: '700' },
});