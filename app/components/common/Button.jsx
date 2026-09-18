import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { colors, radii, typography } from '../../styles/designTokens';

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
        <ActivityIndicator color={colors.textOnPrimary} />
      ) : (
        <Text style={[styles.text, textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = {
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  text: {
    color: colors.textOnPrimary,
    fontWeight: '700',
    fontSize: typography.md,
  },
};