import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CartLine } from '../types/product';
import { useCartStore } from '../stores/cartStore';
import { useState } from 'react';

export default function CartItem({ line }: { line: CartLine }) {
  const [qty, setQty] = useState<number>(line.quantity);
  const remove = useCartStore((s) => s.remove);

  const sum = line.product.price * qty;

  return (
    <View style={styles.row}>
      <Image source={{ uri: line.product.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {line.product.name}
        </Text>
        <Text style={styles.price}>
          {line.product.price} ₽ × {qty} = {sum} ₽
        </Text>

        <View style={styles.controls}>
          <Pressable style={styles.qtyBtn} onPress={() => setQty(qty - 1)}>
            <Text style={styles.qtyText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
          <Pressable onPress={() => remove(line.product.id)} style={styles.remove}>
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
  image: { width: 72, height: 72, borderRadius: 8, backgroundColor: '#f2f2f2' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 13, color: '#1e88e5', fontWeight: '600', marginBottom: 8 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eef3fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: { fontSize: 18, fontWeight: '700', color: '#1e88e5' },
  qty: { fontSize: 16, fontWeight: '700', minWidth: 24, textAlign: 'center' },
  remove: { marginLeft: 'auto' },
  removeText: { color: '#e53935', fontSize: 13 },
});