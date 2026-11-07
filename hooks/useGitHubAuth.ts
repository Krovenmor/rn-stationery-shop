import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
};

export function useGitHubAuth() {
  const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID ?? '';
  const redirectUri = makeRedirectUri({ scheme: 'pharmacy-app', path: 'login' });
  const [request, , promptAsync] = useAuthRequest({
    clientId,
    redirectUri,
    scopes: [],
    responseType: ResponseType.Code,
  }, discovery);

  async function signInWithGitHub(): Promise<string | null> {
    if (!clientId) throw new Error('Вход через GitHub пока не настроен. Используйте тестовый аккаунт.');
    if (!request) throw new Error('GitHub ещё загружается. Попробуйте снова.');

    const result = await promptAsync();
    if (result.type === 'cancel' || result.type === 'dismiss') return null;
    if (result.type !== 'success' || !result.params.code) {
      throw new Error('GitHub не подтвердил вход. Попробуйте снова.');
    }

    return result.params.code;
  }

  return { signInWithGitHub, ready: !clientId || !!request };
}
