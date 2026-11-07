import { Alert, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { useAuthStore } from '../stores/authStore';

export default function LogoutButton() {
  const signOut = useAuthStore((s) => s.signOut);

  async function handleSignOut() {
    try {
      await signOut();
    } catch {
      const message = 'Не удалось удалить сохранённый вход. Попробуйте снова.';
      if (Platform.OS === 'web') window.alert(message);
      else Alert.alert('Ошибка', message);
    }
  }

  return (
    <Pressable accessibilityRole="button" onPress={handleSignOut} style={styles.button}>
      <Text style={styles.text}>Выйти</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8 },
  text: { color: '#43a047', fontWeight: '600' },
});
