import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({
  children,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#888',
  },
  text: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});