import { StyleSheet, Text, View } from 'react-native';
import { selectCartCount, selectCartTotal, useCartStore } from '../stores/cartStore';

export default function CartSummary() {
  const total = useCartStore(selectCartTotal);
  const count = useCartStore(selectCartCount);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>Товаров</Text>
        <Text style={styles.value}>{count}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Итого</Text>
        <Text style={styles.totalValue}>{total} ₽</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '600' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#1e88e5' },
});