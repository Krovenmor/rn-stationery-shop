import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View,
} from 'react-native';
import LoginScreenProtection from '../components/LoginScreenProtection';
import PasswordInput from '../components/PasswordInput';
import { useAuthStore } from '../stores/authStore';
import { useGitHubAuth } from '../hooks/useGitHubAuth';
import { authStyles as styles } from '../styles/authStyles';

export default function LoginScreen() {
  const signIn = useAuthStore((s) => s.signIn);
  const { signInWithGitHub, ready } = useGitHubAuth();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    if (busy) return;
    if (login.trim() !== 'demo' || password !== 'demo123') {
      setError('Неверный логин или пароль');
      return;
    }
    setError('');
    setBusy(true);
    try {
      await signIn('mock-demo-token');
      setPassword('');
    } catch {
      setError('Не удалось сохранить вход на устройстве');
    } finally {
      setBusy(false);
    }
  }

  async function handleGitHub() {
    if (busy) return;
    setError('');
    setBusy(true);
    try {
      const code = await signInWithGitHub();
      if (code) {
        setPassword('');
        await signIn(code);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось войти через GitHub');
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LoginScreenProtection />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.title}>Вход в аптеку</Text>
          <Text style={styles.hint}>Войдите, чтобы открыть каталог и корзину</Text>
          <View>
            <Text style={styles.label}>Логин</Text>
            <TextInput
              accessibilityLabel="Логин"
              style={styles.input}
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              editable={!busy}
            />
          </View>
          <View>
            <Text style={styles.label}>Пароль</Text>
            <PasswordInput value={password} onChangeText={setPassword} onSubmitEditing={handleLogin} editable={!busy} />
          </View>
          {!!error && <Text style={styles.error} accessibilityRole="alert">{error}</Text>}
          <Pressable accessibilityRole="button" disabled={busy} onPress={handleLogin} style={[styles.button, busy && styles.disabled]}>
            <Text style={styles.buttonText}>Войти</Text>
          </Pressable>
          <Text style={styles.hint}>Тестовый аккаунт: demo / demo123</Text>
          <Text style={styles.hint}>или</Text>
          <Pressable accessibilityRole="button" disabled={busy || !ready} onPress={handleGitHub} style={[styles.button, styles.githubButton, (busy || !ready) && styles.disabled]}>
            <Text style={styles.buttonText}>{busy ? 'Входим…' : 'Войти через GitHub'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
