import { useCan, useCanAny, useCanAll } from './useCan';

/**
 * Renderiza children apenas se o usuario tiver a permission necessaria.
 *
 * Uso:
 *   <AuthView permission={PERMISSIONS.MANAGE_USERS}>
 *     <Button title="Gerenciar usuarios" />
 *   </AuthView>
 *
 *   <AuthView anyOf={[PERMISSIONS.ACCESS_DEALER, PERMISSIONS.VIEW_ANALYTICS]}>...</AuthView>
 *   <AuthView allOf={[PERMISSIONS.MANAGE_USERS, PERMISSIONS.VIEW_ANALYTICS]}>...</AuthView>
 */
export function AuthView({ permission, anyOf, allOf, fallback = null, children }) {
  const singleOk = useCan(permission);
  const anyOk = useCanAny(anyOf);
  const allOk = useCanAll(allOf);

  let allowed = true;
  if (permission) allowed = allowed && singleOk;
  if (anyOf) allowed = allowed && anyOk;
  if (allOf) allowed = allowed && allOk;

  return allowed ? children : fallback;
}

export default AuthView;
