import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não ideal para Criptografia de dados sensíveis em repouso
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { logger } from '../utils/logger';

export const API_BASE_URL =
  'https://dealerflowapi-hrb8hjabfgeeehca.mexicocentral-01.azurewebsites.net';

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
    const serverMessage = error.response?.data?.message || error.response?.data?.error || "";
    const url = error.config?.url || '';
    const isNetworkError = !error.response;
    const isSessionValidation = url.startsWith('/auth/me');

    // A validacao de sessao responde 500 no backend (defeito conhecido). Como o
    // app segue funcionando com o cache, nao deve poluir o console com erro fatal.
    if (isSessionValidation) {
      logger.warn(`Falha ao validar sessao no servidor (${status})`);
    } else if (status === 401) {
      logger.warn('Acesso negado (401)');
    } else {
      logger.error(`Erro ${status}:`, error.message);
    }

    // Somente um 401 real encerra a sessao. Um 5xx que por acaso cite "auth" no
    // texto nao pode derrubar um token valido.
    if (status === 401) {
      await clearAuthStorage();
      return Promise.reject({
        status,
        isNetworkError,
        message: "E-mail ou senha incorretos.",
        serverMessage,
        url,
      });
    }

    return Promise.reject({
      status,
      isNetworkError,
      message: serverMessage || "Ocorreu um erro inesperado.",
      serverMessage,
      url,
    });
  }
);
export default api;
