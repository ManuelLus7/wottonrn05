import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = 'cart';

// Guardo el carrito en AsyncStorage
export const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error al guardar el carrito en AsyncStorage:', error);
  }
};

// Cargo el carrito desde AsyncStorage
export const loadCartFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (cartData !== null) {
      return JSON.parse(cartData);
    } else {
      return []; // Si no hay datos en AsyncStorage, devuelvo un carrito vacío
    }
  } catch (error) {
    console.error('Error al cargar el carrito desde AsyncStorage:', error);
    return []; // devuelvo un carrito vacío en caso de error
  }
};

