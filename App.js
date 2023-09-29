import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/navigation/BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart'); // Asegúrate de que 'cart' sea la clave correcta
        const parsedCartData = JSON.parse(cartData);
        if (parsedCartData) {
          store.dispatch(loadCartFromStorage(parsedCartData));
        }
      } catch (error) {
        console.error('Error al cargar el carrito desde AsyncStorage:', error);
      }
    };

    loadCartData();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
