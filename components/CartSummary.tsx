import { StyleSheet, Text, View } from 'react-native';
import { selectCartCount, selectCartUniqueCount, useCartStore } from '../stores/cartStore';

export default function CartSummary() {
  const unique = useCartStore(selectCartUniqueCount);
  const count = useCartStore(selectCartCount);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>Позиций</Text>
        <Text style={styles.value}>{unique}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Всего товаров</Text>
        <Text style={styles.totalValue}>{count} шт.</Text>
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
  totalValue: { fontSize: 18, fontWeight: '800', color: '#43a047' },
});