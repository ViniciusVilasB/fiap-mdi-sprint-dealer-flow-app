import { View, ActivityIndicator, Text } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useCan, useCanAny, useCanAll } from './useCan';
import Button from '../components/common/Button';
import { colors, radii, spacing, typography } from '../styles/designTokens';

/**
 * Guarda uma rota inteira (ou um grupo dentro de um _layout).
 *
 * Comportamento:
 *  - Enquanto carrega a sessao -> exibe loader.
 *  - Se nao houver usuario logado -> redireciona para /login.
 *  - Se nao tiver a permission requerida -> exibe a tela de "sem acesso" (ou redireciona).
 *
 * Props:
 *  - permission:  string  - exige UMA permission especifica
 *  - anyOf:       string[] - exige PELO MENOS UMA das listadas
 *  - allOf:       string[] - exige TODAS as listadas
 *  - redirectTo:  string  - rota para redirecionar em caso de negacao (opcional)
 *  - fallback:    ReactNode - elemento customizado para exibir em caso de negacao
 */
export function RouteGuard({
  permission,
  anyOf,
  allOf,
  redirectTo,
  fallback,
  children,
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const singleOk = useCan(permission);
  const anyOk = useCanAny(anyOf);
  const allOk = useCanAll(allOf);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.disabledLight} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  let allowed = true;
  if (permission) allowed = allowed && singleOk;
  if (anyOf) allowed = allowed && anyOk;
  if (allOf) allowed = allowed && allOk;

  if (!allowed) {
    if (redirectTo) {
      return <Redirect href={redirectTo} />;
    }
    if (fallback) {
      return fallback;
    }
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Acesso negado</Text>
        <Text style={styles.subtitle}>
          Você não tem permissão para visualizar esta página.
        </Text>
        <Button style={styles.button} onPress={() => router.replace('/')}>
          Voltar ao início
        </Button>
      </View>
    );
  }

  return children;
}

const styles = {
  center: {
    flex: 1,
    backgroundColor: colors.backgroundMuted,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.page,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '700',
    color: colors.textStrong,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.page,
  },
  button: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.page,
    borderRadius: radii.xl,
  },
};

export default RouteGuard;
