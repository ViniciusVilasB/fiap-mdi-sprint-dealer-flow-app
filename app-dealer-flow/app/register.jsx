import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const router = useRouter();

  const handleRegister = async () => {
    setFeedback({ message: '', type: '' }); // Limpa o erro anterior
    const { name, email, password, confirm } = form;
    const emailRegex = /\S+@\S+\.\S+/;

    // Validações rigorosas com feedback na tela
    if (!name || !email) {
      return setFeedback({ message: "Preencha nome e e-mail.", type: 'error' });
    }
    if (!emailRegex.test(email)) {
      return setFeedback({ message: "Formato de e-mail inválido.", type: 'error' });
    }
    if (password.length < 6) {
      return setFeedback({ message: "A senha deve ter no mínimo 6 caracteres.", type: 'error' });
    }
    if (password !== confirm) {
      return setFeedback({ message: "As senhas não são idênticas.", type: 'error' });
    }

    try {
      // Cria a chave e estrutura os dados
      const safeEmailKey = email.toLowerCase().replace('@', '_');
      const userKey = `user_${safeEmailKey}`;
      
      const userData = JSON.stringify({ name, email: email.toLowerCase(), password });
      
      // Salva os dados do novo usuário de forma segura e criptografada
      await SecureStore.setItemAsync(userKey, userData);
      
      // Feedback de sucesso
      setFeedback({ message: "Cadastro realizado com sucesso! Redirecionando...", type: 'success' });
      
      // Aguarda 1.5 segundos para o usuário ler a mensagem e envia para o login
      setTimeout(() => {
        router.replace('/login');
      }, 1500);

    } catch (error) {
      setFeedback({ message: "Falha técnica ao salvar os dados.", type: 'error' });
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <View style={styles.card}>
          <View style={styles.cardLogoContainer}>
            <View style={styles.cardLogo}></View>
          </View>

          {feedback.message !== '' && (
            <Text style={[styles.feedbackText, feedback.type === 'error' ? styles.errorText : styles.successText]}>
              {feedback.message}
            </Text>
          )}

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#333"
              onChangeText={t => setForm({...form, name: t})}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#333"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={t => setForm({...form, email: t})}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Senha (mínimo 6 caracteres)</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#333"
              secureTextEntry
              onChangeText={t => setForm({...form, password: t})}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirmação de senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmação de senha"
              placeholderTextColor="#333"
              secureTextEntry
              onChangeText={t => setForm({...form, confirm: t})}
            />
          </View>

          <TouchableOpacity style={styles.buttonMain} onPress={handleRegister}>
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.linkText}>Já tem uma conta? Faça Login.</Text>
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

  cardLogoContainer: { alignItems: 'center', marginBottom: 20 },
  cardLogo: { width: 100, height: 100, backgroundColor: '#A6A6A6', borderRadius: 20 },

  feedbackText: { textAlign: 'center', marginBottom: 15, fontSize: 14, fontWeight: 'bold' },
  errorText: { color: '#ff4444' },
  successText: { color: '#00C851' },

  formGroup: { width: '100%', marginBottom: 12 },
  label: { fontSize: 16, color: '#000', marginBottom: 4, alignSelf: 'flex-start', fontWeight: '500' },

  input: { width: '100%', height: 48, backgroundColor: '#A6A6A6', borderRadius: 10, paddingHorizontal: 15, color: '#000', fontSize: 16, borderBottomWidth: 0 },

  buttonMain: { width: '100%', height: 50, backgroundColor: '#808080', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  linkText: { color: '#000', textAlign: 'center', marginTop: 25, fontSize: 14, fontWeight: '500' }
});