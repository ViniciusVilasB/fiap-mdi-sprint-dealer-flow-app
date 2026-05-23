import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/AuthService';
import { extractPermissionsFromToken } from '../auth/permissions';

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

        // Restaura cache local imediatamente para evitar flash de tela de login.
        const cached = await AsyncStorage.getItem(SESSION_KEY);
        if (cached) {
          setUser(JSON.parse(cached));
        }

        // Valida a sessao no backend; em caso de 401 o interceptor ja limpa o storage.
        try {
          const freshUser = await AuthService.me();
          const userData = freshUser?.user ?? freshUser;
          setUser(userData);
          await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
        } catch (error) {
          if (error?.status === 401) {
            setUser(null);
            setPermissions([]);
          } else {
            console.warn('Falha ao validar sessão, mantendo cache local:', error?.message);
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
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } finally {
      await AsyncStorage.removeItem(SESSION_KEY);
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
