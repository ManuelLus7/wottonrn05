import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredProducts: [], // Almaceno los productos filtrados
  categoryFilter: 'All', // Filtro de categoría predeterminado
  priceFilter: 1000, // Precio máximo predeterminado
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
  },
});

export const {
  setFilteredProducts,
  setCategoryFilter,
  setPriceFilter,
} = productSlice.actions;

export default productSlice.reducer;
