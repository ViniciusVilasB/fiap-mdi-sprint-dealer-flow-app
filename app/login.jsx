import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';
import { Image } from 'react-native';
import logo from '../assets/main_icon.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setFeedback('');

    if (!email || !password) {
      return setFeedback("Preencha e-mail e senha.");
    }

    setLoading(true);
    // analises de consistencia de dados
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
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry
              editable={!loading}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <TouchableOpacity 
            style={[styles.buttonMain, loading && styles.buttonMainDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ENTRAR</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20
  },

  card: { 
    width: '100%',
    maxWidth: 380,
    padding: 32, 
    backgroundColor: '#ffffff', 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 3
  },

  cardLogoContainer: { 
    alignItems: 'center', 
    marginBottom: 32 
  },
  logo: { 
    width: 100, 
    height: 100 
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 28,
    textAlign: 'center',
    fontWeight: '400'
  },

  feedbackContainer: {
    width: '100%',
    backgroundColor: '#ffe6e6',
    borderLeftWidth: 4,
    borderLeftColor: '#ff4444',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20
  },

  errorText: { 
    color: '#d32f2f', 
    textAlign: 'center', 
    fontSize: 13,
    fontWeight: '500'
  },

  formGroup: { 
    width: '100%', 
    marginBottom: 18 
  },
  label: { 
    fontSize: 13, 
    color: '#1a1a1a', 
    marginBottom: 8, 
    alignSelf: 'flex-start', 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  input: { 
    width: '100%', 
    height: 48, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 10, 
    paddingHorizontal: 16, 
    color: '#1a1a1a', 
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontWeight: '400'
  },

  inputFocused: {
    backgroundColor: '#ffffff',
    borderColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2
  },

  buttonMain: { 
    width: '100%', 
    height: 48, 
    backgroundColor: '#2563eb', 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 24,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4
  },

  buttonMainDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0.1
  },

  buttonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase'
  },
});