import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Product } from '../types/product';

export default function ProductDetailsCard({ product }: { product: Product }) {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>{product.price} ₽</Text>
      <Text style={styles.stock}>В наличии: {product.stock} шт.</Text>
      <Text style={styles.desc}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginBottom: 16,
  },
  brand: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 22, fontWeight: '700', marginVertical: 6 },
  category: { fontSize: 13, color: '#999', marginBottom: 12 },
  price: { fontSize: 24, fontWeight: '800', color: '#1e88e5', marginBottom: 4 },
  stock: { fontSize: 13, color: '#4caf50', marginBottom: 16 },
  desc: { fontSize: 15, lineHeight: 22, color: '#333' },
});