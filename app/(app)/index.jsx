import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    textMain: isDarkMode ? '#FFFFFF' : '#111111',
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.textMain }]}>
        Conteúdo Principal da Home
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' }
});