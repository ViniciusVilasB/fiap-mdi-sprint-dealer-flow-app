import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { useAuth } from './contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    setFeedback('');

    if (!email || !password) {
      return setFeedback("Preencha e-mail e senha.");
    }

    try {
      const safeEmailKey = email.toLowerCase().replace('@', '_');
      const userKey = `user_${safeEmailKey}`;
      
      const storedUser = await SecureStore.getItemAsync(userKey);
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        if (userData.password === password) {
          await login(userData); 
        } else {
          setFeedback("Senha incorreta.");
        }
      } else {
        setFeedback("Usuário não cadastrado.");
      }
    } catch (e) {
      setFeedback("Falha na autenticação.");
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <View style={styles.card}>
          <View style={styles.cardLogoContainer}>
            <View style={styles.cardLogo}></View>
          </View>

          {feedback !== '' && (
            <Text style={styles.errorText}>{feedback}</Text>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#333"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#333"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.buttonMain} onPress={handleLogin}>
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },

  card: { width: '85%', padding: 25, backgroundColor: '#E6E6E6', borderRadius: 25, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },

  cardLogoContainer: { alignItems: 'center', marginBottom: 25 },
  cardLogo: { width: 100, height: 100, backgroundColor: '#A6A6A6', borderRadius: 20 },

  errorText: { color: '#ff4444', textAlign: 'center', marginBottom: 15, fontSize: 14, fontWeight: 'bold' },

  formGroup: { width: '100%', marginBottom: 15 },
  label: { fontSize: 16, color: '#000', marginBottom: 5, alignSelf: 'flex-start', fontWeight: '500' },

  input: { width: '100%', height: 50, backgroundColor: '#A6A6A6', borderRadius: 10, paddingHorizontal: 15, color: '#000', fontSize: 16, borderBottomWidth: 0 },

  buttonMain: { width: '100%', height: 50, backgroundColor: '#808080', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});