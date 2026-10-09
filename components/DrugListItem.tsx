import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Drug } from '../types/drugs';
import { useCartStore } from '../stores/cartStore';

interface Props {
  drug: Drug;
  onPress: () => void;
}

export default function DrugListItem({ drug, onPress }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.brand}>{drug.manufacturer}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {drug.name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {drug.category}
        </Text>
        <Text style={styles.stock}>{drug.stock} шт.</Text>
      </View>

      {/* stopPropagation: чтобы тап по кнопке не открывал экран товара */}
      <Pressable
        style={styles.addBtn}
        onPress={(e) => {
          e.stopPropagation();
          add(drug);
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
  info: { flex: 1, marginLeft: 12 },
  brand: { fontSize: 11, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 14, fontWeight: '600', marginVertical: 2 },
  category: { fontSize: 12, color: '#999', marginBottom: 2 },
  stock: { fontSize: 15, fontWeight: '700', color: '#43a047' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#43a047',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 24, fontWeight: '700' },
});