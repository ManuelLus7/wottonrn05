import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // Inicializa con un arreglo vacío
    filteredProducts: [], // Inicializa con un arreglo vacío
    categoryFilter: 'All',
    priceFilter: 1000,
    cart: [],
    searchTerm: '',
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload; // Actualiza los productos filtrados
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  setProducts,
  setCategoryFilter,
  setPriceFilter,
  addToCart,
  removeFromCart,
  setSearchTerm,
} = productSlice.actions;
export default productSlice.reducer;
