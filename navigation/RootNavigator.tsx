import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import HeaderCartButton from '../components/HeaderCartButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            title: 'Канцтовары',
            headerRight: () => <HeaderCartButton />,
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Товар',
            headerRight: () => <HeaderCartButton />,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Корзина' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}