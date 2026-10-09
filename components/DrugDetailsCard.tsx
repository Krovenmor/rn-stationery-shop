import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Drug } from '../types/drugs';

export default function DrugDetailsCard({ drug }: { drug: Drug }) {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <Text style={styles.brand}>{drug.manufacturer}</Text>
      <Text style={styles.name}>{drug.name}, {drug.latin_name}</Text>
      <Text style={styles.category}>{drug.category}</Text>
      <Text style={styles.category}>{drug.form}, {drug.dosage}</Text>
      <Text style={styles.category}>
        {drug.active_substance}, рецептурное: {drug.prescription_required ? 'да' : 'нет'}
      </Text>
      <Text style={styles.stock}>В наличии: {drug.stock} шт.</Text>
      <Text style={styles.desc}>{drug.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  brand: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 22, fontWeight: '700', marginVertical: 6 },
  category: { fontSize: 13, color: '#999', marginBottom: 12 },
  stock: { fontSize: 13, color: '#4caf50', marginBottom: 16 },
  desc: { fontSize: 15, lineHeight: 22, color: '#333' },
});