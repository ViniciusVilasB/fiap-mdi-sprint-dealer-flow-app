import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Falha ao ler token de autenticação:', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Normaliza erros e trata 401 limpando a sessao local.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, 'user_session']);
      } catch (storageError) {
        console.warn('Falha ao limpar sessão após 401:', storageError);
      }
    }

    const normalized = {
      status: error.response?.status ?? 0,
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Erro inesperado na requisição',
      data: error.response?.data ?? null,
      original: error,
    };

    return Promise.reject(normalized);
  },
);

export default api;
