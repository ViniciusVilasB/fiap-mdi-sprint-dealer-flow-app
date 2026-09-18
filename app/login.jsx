import React, { useState } from 'react';
import { View, TextInput, Text, SafeAreaView } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { Image } from 'react-native';
import logo from '../assets/main_icon.png'
import { logger } from './utils/logger';
import Button from './components/common/Button';
import { borders, colors, radii, shadows, spacing, typography, sizes } from './styles/designTokens';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const { login } = useAuth();

  const handleLogin = async () => {
    setFeedback('');

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
    return setFeedback('Por favor, preencha todos os campos.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return setFeedback('Por favor, insira um e-mail válido.');
    }

    setLoading(true);
    try {
      await login({ email: normalizedEmail, password: normalizedPassword });
    } catch (error) {
      const errorMessage = error?.message || "Falha na autenticação. Verifique suas credenciais e tente novamente.";
      setFeedback(errorMessage);
      logger.info(`Tentativa de login falhou com status ${error.status}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <View style={styles.card}>
          <View style={styles.cardLogoContainer}>
              <Image source={logo} style={styles.logo}/>
          </View>

          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          {feedback !== '' && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.errorText}>{feedback}</Text>
            </View>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
              placeholder="seu@email.com"
              placeholderTextColor={colors.textSubtle}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              maxLength={80}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
              placeholder="Digite sua senha"
              placeholderTextColor={colors.textSubtle}
              secureTextEntry
              editable={!loading}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              maxLength={60}
            />
          </View>

          <Button
            style={styles.buttonMain}
            onPress={handleLogin}
            disabled={loading}
            loading={loading}
          >
            ENTRAR
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  safeContainer: { 
    flex: 1, 
    backgroundColor: colors.backgroundMuted
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: colors.backgroundMuted,
    paddingHorizontal: spacing.section
  },

  card: { 
    width: '100%',
    maxWidth: 380,
    padding: spacing.card,
    backgroundColor: colors.surface,
    borderRadius: radii.panel,
    alignItems: 'center', 
    justifyContent: 'center', 
    ...shadows.loginCard
  },

  cardLogoContainer: { 
    alignItems: 'center', 
    marginBottom: spacing.card
  },
  logo: { 
    width: sizes.logoLarge,
    height: sizes.logoLarge
  },

  title: {
    fontSize: typography.display,
    fontWeight: '700',
    color: colors.textStrong,
    marginBottom: spacing.lg,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginBottom: spacing.card,
    textAlign: 'center',
    fontWeight: '400'
  },

  feedbackContainer: {
    width: '100%',
    backgroundColor: colors.errorSurface,
    borderLeftWidth: spacing.sm,
    borderLeftColor: colors.errorStrong,
    borderRadius: radii.lg,
    padding: spacing.xxl,
    marginBottom: spacing.section
  },

  errorText: { 
    color: colors.error,
    textAlign: 'center', 
    fontSize: typography.sm,
    fontWeight: '500'
  },

  formGroup: { 
    width: '100%', 
    marginBottom: spacing.page
  },
  label: { 
    fontSize: typography.sm,
    color: colors.textStrong,
    marginBottom: spacing.lg,
    alignSelf: 'flex-start', 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  input: { 
    width: '100%', 
    height: sizes.input,
    backgroundColor: colors.backgroundMuted,
    borderRadius: radii.xl,
    paddingHorizontal: spacing.page,
    color: colors.textStrong,
    fontSize: typography.md,
    borderWidth: borders.thin,
    borderColor: colors.borderStrong,
    fontWeight: '400'
  },

  inputFocused: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    ...shadows.focus
  },

  buttonMain: { 
    width: '100%', 
    height: sizes.input,
    borderRadius: radii.xl,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: spacing.page,
    ...shadows.button
  },
};