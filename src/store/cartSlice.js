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

      if (existingItem) {
        // Si el producto ya está en el carrito, verifica el límite de cantidad
        if (existingItem.quantity + newItem.quantity <= 10) {
          existingItem.quantity += newItem.quantity;
        } else {
          // Puedes mostrar un mensaje de error o realizar otra acción
          console.log('Se ha alcanzado el límite de cantidad para este producto.');
        }
      } else {
        // Si es un producto nuevo, agrégalo al carrito
        state.items.push(newItem);
      }

      // Guardar el carrito actualizado en AsyncStorage
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);

      // Guardar el carrito actualizado en AsyncStorage
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      // Guardar el carrito actualizado en AsyncStorage
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];

      // Limpiar el carrito en AsyncStorage
      AsyncStorage.removeItem(CART_STORAGE_KEY);
    },
    loadCartFromStorage: (state, action) => {
      // Cargar el carrito desde AsyncStorage cuando se inicie la aplicación
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
  loadCartFromStorage, // Nueva acción para cargar el carrito desde AsyncStorage
} = cartSlice.actions;
export default cartSlice.reducer;
