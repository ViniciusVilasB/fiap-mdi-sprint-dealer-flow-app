import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import AuthService from '../services/AuthService';
import { extractPermissionsFromToken } from '../auth/permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Não ideal para Criptografia de dados sensíveis em repouso
import { Platform } from 'react-native';
import { logger } from '../utils/logger';

const AuthContext = createContext({});

const SESSION_KEY = 'user_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await AuthService.getStoredToken();
        if (!token) {
          return;
        }

        setPermissions(extractPermissionsFromToken(token));

        let cached;
        if (Platform.OS === 'web') {
          cached = await AsyncStorage.getItem(SESSION_KEY);
        } else {
          cached = await SecureStore.getItemAsync(SESSION_KEY);
        }

        if (cached) {
          setUser(JSON.parse(cached));
        }

        // Valida a sessao no backend
        try {
          const freshUser = await AuthService.me();
          const userData = freshUser?.user ?? freshUser;
          setUser(userData);
          
          // --- MUDANÇA AQUI: Lógica Híbrida para escrita ---
          if (Platform.OS === 'web') {
            await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
          } else {
            await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(userData));
          }
          
        } catch (error) {
          if (error?.status === 401) {
            setUser(null);
            setPermissions([]);
          } else {
            logger.warn('Falha ao validar sessão no servidor')
          }
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async ({ email, password }) => {
    const data = await AuthService.login({ email, password });
    const userData = data?.user ?? data;
    const token = await AuthService.getStoredToken();
    setPermissions(extractPermissionsFromToken(token));
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    } else {
      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(userData));
    }
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } finally {
      // Substitua a exclusão ao deslogar por isso:
      if (Platform.OS === 'web') {
        await AsyncStorage.removeItem(SESSION_KEY);
      } else {
        await SecureStore.deleteItemAsync(SESSION_KEY);
      }
      setUser(null);
      setPermissions([]);
    }
  };

  const value = useMemo(
    () => ({ user, permissions, login, logout, isLoading }),
    [user, permissions, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
