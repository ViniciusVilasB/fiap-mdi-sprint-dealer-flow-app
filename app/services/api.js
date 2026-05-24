import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não ideal para Criptografia de dados sensíveis em repouso
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { logger } from '../utils/logger';

export const API_BASE_URL =
  'https://dealerflowapp-ctefd3bvb4hthedn.mexicocentral-01.azurewebsites.net';

export const AUTH_TOKEN_KEY = 'auth_token';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Injeta o token de autenticacao em toda requisicao, se existir.
api.interceptors.request.use(
  async (config) => {
    try {
      // Lógica Híbrida de Leitura
      let token;
      if (Platform.OS === 'web') {
        token = await AsyncStorage.getItem(AUTH_TOKEN_KEY); 
      } else {
        token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      logger.info('Falha ao acessar token de autenticação.');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Helper para limpar sessões de forma híbrida
const clearAuthStorage = async () => {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, 'user_session']);
    } else {
      await Promise.all([
        SecureStore.deleteItemAsync(AUTH_TOKEN_KEY),
        SecureStore.deleteItemAsync('user_session')
      ]);
    }
  } catch (e) {
    logger.warn('Falha ao limpar sessão');
  }
};

// Normaliza erros e trata 401 limpando a sessao local.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status || 500;
    const msg = error.response?.data?.message || error.response?.data?.error || "";

    status === 401 ? logger.warn('Acesso negado (401)') : logger.error(`Erro ${status}:`, error.message);

    const isAuthError = status === 401 || (status === 500 && (msg.includes("credentials") || msg.includes("auth")));

    if (isAuthError) {
      if (status === 401) await clearAuthStorage();
      return Promise.reject({ status: 401, message: "E-mail ou senha incorretos." });
    }

    return Promise.reject({ status, message: "Ocorreu um erro inesperado." });
  }
);
export default api;
