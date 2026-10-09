import { Alert, FlatList, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { selectCartCount, selectCartUniqueCount, useCartLineDrugs, useCartStore } from '../stores/cartStore';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyState from '../components/EmptyState';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const lines = useCartLineDrugs();
  const clear = useCartStore((s) => s.clear);

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Корзина пуста"
        subtitle="Добавьте товары из каталога"
      />
    );
  }

  const handleBuy = () => {
    // Читаем актуальное состояние из стора вне React — фишка Zustand
    const state = useCartStore.getState();
    const unique = selectCartUniqueCount(state);
    const count = selectCartCount(state);
    const title = 'Спасибо за покупку! 🎉';
    const message = `Вы заказали ${count} шт. (позиций: ${unique}).`;

    // браузерный alert для веба
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
      clear();
      return;
    }

    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            clear();
            // Закрытие приложения — только Android.
            // На iOS это ограничено политикой Apple.
            try {
              const RNExitApp = require('react-native-exit-app').default;
              RNExitApp.exitApp();
            } catch {
              // библиотека не установлена — просто возвращаемся назад
              navigation.popToTop();
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lines}
        keyExtractor={(l) => l.drug.id}
        renderItem={({ item }) => <CartItem line={item} />}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <CartSummary />
        <Pressable style={styles.buyBtn} onPress={handleBuy}>
          <Text style={styles.buyBtnText}>Купить</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f8' },
  list: { paddingVertical: 6 },
  footer: { backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
  buyBtn: {
    backgroundColor: '#43a047',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});