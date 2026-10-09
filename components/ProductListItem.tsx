import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';
import { useCartStore } from '../stores/cartStore';

interface Props {
  product: Product;
  onPress: () => void;
}

export default function ProductListItem({ product, onPress }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{product.price} ₽</Text>
      </View>

      {/* stopPropagation: чтобы тап по кнопке не открывал экран товара */}
      <Pressable
        style={styles.addBtn}
        onPress={(e) => {
          e.stopPropagation();
          add(product);
        }}
      >
        <Text style={styles.addBtnText}>+</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#f2f2f2' },
  info: { flex: 1, marginLeft: 12 },
  brand: { fontSize: 11, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 14, fontWeight: '600', marginVertical: 2 },
  price: { fontSize: 15, fontWeight: '700', color: '#1e88e5' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1e88e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 24, fontWeight: '700' },
});