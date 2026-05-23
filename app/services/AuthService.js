import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { AUTH_TOKEN_KEY } from './api';

const AUTH_BASE = '/auth';

async function persistToken(token) {
  if (token) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

async function clearToken() {
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
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
      console.warn('Falha ao chamar logout no servidor:', error?.message);
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
    return AsyncStorage.getItem(AUTH_TOKEN_KEY);
  },

  clearToken,
};

export default AuthService;
