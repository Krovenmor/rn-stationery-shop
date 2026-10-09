import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CartLineDrug } from '../types/drugs';
import { useCartStore } from '../stores/cartStore';

export default function CartItem({ line }: { line: CartLineDrug }) {
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {line.drug.name}
        </Text>
        <Text style={styles.meta}>
          {line.drug.form}, {line.drug.dosage}
        </Text>

        <View style={styles.controls}>
          <Pressable style={styles.qtyBtn} onPress={() => decrement(line.drug.id)}>
            <Text style={styles.qtyText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{line.quantity}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => increment(line.drug.id)}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
          <Pressable onPress={() => remove(line.drug.id)} style={styles.remove}>
            <Text style={styles.removeText}>Удалить</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  meta: { fontSize: 13, color: '#43a047', fontWeight: '600', marginBottom: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 18, fontWeight: '700', color: '#43a047' },
  qty: { fontSize: 16, fontWeight: '700', minWidth: 24, textAlign: 'center' },
  remove: { marginLeft: 'auto' },
  removeText: { color: '#e53935', fontSize: 13 },
});