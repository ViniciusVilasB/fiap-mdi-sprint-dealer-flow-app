import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não ideal para Criptografia em repouso
import api, { AUTH_TOKEN_KEY } from './api';
import { logger } from '../utils/logger';

const AUTH_BASE = '/auth';

async function persistToken(token) {
  if (token) {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token); 
    } else {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    }
  }
}

async function clearToken() {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY); 
  } else {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }
}

const AuthService = {
  async login({ email, password }) {
    const { data } = await api.post(`${AUTH_BASE}/login`, { email, password });
    await persistToken(data?.token ?? data?.accessToken);
    return data;
  },

  async register(payload) {
    const { data } = await api.post(`${AUTH_BASE}/register`, payload);
    await persistToken(data?.token ?? data?.accessToken);
    return data;
  },

  async logout() {
    try {
      await api.post(`${AUTH_BASE}/logout`);
    } catch (error) {
        logger.warn('Falha ao chamar logout no servidor.');
    } finally {
      await clearToken();
    }
  },

  async me() {
    const { data } = await api.get(`${AUTH_BASE}/me`);
    return data;
  },

  async refreshToken() {
    const { data } = await api.post(`${AUTH_BASE}/refresh`);
    await persistToken(data?.token ?? data?.accessToken);
    return data;
  },

  async getStoredToken() {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY); 
    } else {
      return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    }
  },

  clearToken,
};

export default AuthService;
