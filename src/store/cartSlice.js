import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'cart'; // Una clave única para almacenar el carrito en AsyncStorage

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      // Si el producto ya está en el carrito, agrego la cantidad
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        // Si es un producto nuevo, lo agrego al carrito
        state.items.push(newItem);
      }

      // Guardo el carrito actualizado en AsyncStorage
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      // Guardo el carrito actualizado en AsyncStorage
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      // Guardo el carrito actualizado en AsyncStorage
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];

      // Limpio el carrito en AsyncStorage
      AsyncStorage.removeItem(CART_STORAGE_KEY);
    },
    loadCartFromStorage: (state, action) => {
      // Cargo el carrito desde AsyncStorage cuando se inicie la aplicación
      const savedCart = action.payload;
      if (savedCart) {
        state.items = savedCart;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
