import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import type { RootStackParamList } from '../types/navigation';
import DrugListScreen from '../screens/DrugListScreen';
import DrugDetailsScreen from '../screens/DrugDetailsScreen';
import CartScreen from '../screens/CartScreen';
import HeaderCartButton from '../components/HeaderCartButton';
import LogoutButton from '../components/LogoutButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

function HeaderButtons() {
  return (
    <View style={styles.buttons}>
      <LogoutButton />
      <HeaderCartButton />
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DrugList" component={DrugListScreen} options={{
          title: 'Аптека', headerRight: () => <HeaderButtons />,
        }} />
        <Stack.Screen name="DrugDetails" component={DrugDetailsScreen} options={{
          title: 'Препарат', headerRight: () => <HeaderButtons />,
        }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{
          title: 'Корзина', headerRight: () => <LogoutButton />,
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
