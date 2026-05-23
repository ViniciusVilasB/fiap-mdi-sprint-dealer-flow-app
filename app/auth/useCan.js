import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission, hasAnyPermission, hasAllPermissions } from './permissions';

/**
 * Verifica se o usuario logado possui uma permission especifica.
 *
 * @param {string} permission - chave da permission (ex.: PERMISSIONS.MANAGE_USERS)
 * @returns {boolean}
 */
export function useCan(permission) {
  const { permissions } = useAuth();
  return useMemo(() => hasPermission(permissions, permission), [permissions, permission]);
}

/**
 * Verifica se o usuario possui pelo menos uma das permissions informadas.
 */
export function useCanAny(requiredList = []) {
  const { permissions } = useAuth();
  return useMemo(
    () => hasAnyPermission(permissions, requiredList),
    [permissions, requiredList],
  );
}

/**
 * Verifica se o usuario possui todas as permissions informadas.
 */
export function useCanAll(requiredList = []) {
  const { permissions } = useAuth();
  return useMemo(
    () => hasAllPermissions(permissions, requiredList),
    [permissions, requiredList],
  );
}
