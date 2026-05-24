import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function Home() {
  const { isDarkMode } = useTheme();

  const themeColors = {
    background: isDarkMode ? '#1b1b1b' : '#f2f2f2',
    textMain: isDarkMode ? '#f2f2f2' : '#1b1b1b',
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