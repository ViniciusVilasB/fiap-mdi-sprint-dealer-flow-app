import { jwtDecode } from 'jwt-decode';

export const PERMISSIONS = Object.freeze({
  ACCESS_CAR_MODEL_DATA: 'CanAccessCarModelData',
  ACCESS_DEALER: 'CanAccessDealer',
  VIEW_ANALYTICS: 'CanViewAnalytics',
  MANAGE_USERS: 'CanManageUsers',
});

export function extractPermissionsFromToken(token) {
  if (!token) return [];
  try {
    const payload = jwtDecode(token);
    const claim = payload?.permissions ?? payload?.permission ?? [];
    if (Array.isArray(claim)) return claim;
    if (typeof claim === 'string') return [claim];
    return [];
  } catch (error) {
    console.warn('Falha ao decodificar JWT:', error?.message);
    return [];
  }
}

export function hasPermission(userPermissions, required) {
  if (!required) return true;
  if (!Array.isArray(userPermissions)) return false;
  return userPermissions.includes(required);
}

export function hasAnyPermission(userPermissions, requiredList = []) {
  if (!requiredList || requiredList.length === 0) return true;
  if (!Array.isArray(userPermissions)) return false;
  return requiredList.some((p) => userPermissions.includes(p));
}

export function hasAllPermissions(userPermissions, requiredList = []) {
  if (!requiredList || requiredList.length === 0) return true;
  if (!Array.isArray(userPermissions)) return false;
  return requiredList.every((p) => userPermissions.includes(p));
}
