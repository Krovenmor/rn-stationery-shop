import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import LoginScreen from './screens/LoginScreen';
import { useAuthStore } from './stores/authStore';

export default function App() {
  const token = useAuthStore((s) => s.token);
  const isLoading = useAuthStore((s) => s.isLoading);
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#43a047" />
        </View>
      ) : token ? <RootNavigator /> : <LoginScreen />}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
