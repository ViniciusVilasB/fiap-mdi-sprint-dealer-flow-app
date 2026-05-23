import { View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { useCan, useCanAny, useCanAll } from './useCan';

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
        <ActivityIndicator size="large" color="#A6A6A6" />
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
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
          <Text style={styles.buttonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default RouteGuard;
