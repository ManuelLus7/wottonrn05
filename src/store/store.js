import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice'; // Agrega el slice del carrito de compras

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, // Agrega el slice del carrito de compras al rootReducer
    // Agrega más reducers si es necesario
  },
});

export default store;
