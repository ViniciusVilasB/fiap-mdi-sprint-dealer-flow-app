import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthView } from './auth/AuthView';
import { PERMISSIONS } from './auth/permissions';

export default function Home() {
  const router = useRouter();
  
  const { logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const handleLogout = () => {
    setIsUserMenuVisible(false);
    if (logout) {
      logout();
    }
  };

  const themeColors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    headerFooter: isDarkMode ? '#1E1E1E' : '#E0E0E0',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    iconBg: isDarkMode ? '#333333' : '#A6A6A6',
    menuBg: isDarkMode ? '#2C2C2C' : '#FFFFFF',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>

      <View style={[styles.headerContainer, { backgroundColor: themeColors.headerFooter }]}>
        <View style={[styles.profilePlaceholder, { backgroundColor: themeColors.iconBg }]} />
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity 
            style={[styles.iconButton, { backgroundColor: themeColors.iconBg }]} 
            onPress={() => setIsDarkMode(!isDarkMode)}
            activeOpacity={0.7}>
            <Ionicons 
              name={isDarkMode ? "sunny" : "moon"} 
              size={20} 
              color={themeColors.text} 
            />
          </TouchableOpacity>
          <View>
            <TouchableOpacity 
              style={[styles.iconButton, { backgroundColor: themeColors.iconBg }]} 
              onPress={() => setIsUserMenuVisible(!isUserMenuVisible)}
              activeOpacity={0.7}>
              <Ionicons name="person" size={20} color={themeColors.text} />
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

      <View style={styles.mainContent} />
      <View style={[styles.footerContainer, { backgroundColor: themeColors.headerFooter }]}>

        <AuthView permission={PERMISSIONS.ACCESS_DEALER}>
          <TouchableOpacity
            style={[styles.footerTabIcon, { backgroundColor: themeColors.iconBg }]}
            onPress={() => router.push('/dashboard')}
          >
            <MaterialCommunityIcons name="view-dashboard" size={24} color={themeColors.text} />
          </TouchableOpacity>
        </AuthView>

        <AuthView permission={PERMISSIONS.ACCESS_CAR_MODEL_DATA}>
          <TouchableOpacity
            style={[styles.footerTabIcon, { backgroundColor: themeColors.iconBg }]}
            onPress={() => router.push('/cars')}
          >
            <Ionicons name="car-sport" size={24} color={themeColors.text} />
          </TouchableOpacity>
        </AuthView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 120,
    paddingTop: 60,
    zIndex: 10,
  },
  profilePlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 8,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 130,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Footer
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    paddingBottom: 20,
  },
  footerTabIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});