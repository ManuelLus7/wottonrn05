import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilteredProducts,
  setCategoryFilter,
  setPriceFilter,
} from '../redux/productSlice';
import { ProductCard, SearchBar } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const priceFilter = useSelector((state) => state.products.priceFilter);

  const [searchTerm, setSearchTerm] = useState('');

  const productCount = filteredProducts.length;

  const applyFilter = () => {
    // Aplico el filtro utilizando las acciones de Redux
    dispatch(setFilteredProducts(filteredProducts));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(setCategoryFilter('All'));
    dispatch(setPriceFilter(1000));
    dispatch(setFilteredProducts(products));
    applyFilter();
  };

  const clearSearch = () => {
    setSearchTerm('');
    dispatch(setCategoryFilter('All'));
    dispatch(setPriceFilter(1000));
    dispatch(setProducts('', 'All', 1000));
  };

  const showProductDetails = (selectedProduct) => {
    console.log(`Mostrar detalles del producto: ${selectedProduct.name}`);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <SearchBar onSearch={handleSearch} value={searchTerm} />
        {searchTerm !== '' && (
          <Ionicons
            name="close-circle"
            size={24}
            color="blue"
            onPress={clearSearch}
          />
        )}
      </View>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={categoryFilter}
          onValueChange={(value) => dispatch(setCategoryFilter(value))}
          style={styles.picker}
        >
          <Picker.Item label="Todas las Categorías" value="All" />
          </Picker>

        <Text>Precio Máximo: ${priceFilter}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={10}
          value={priceFilter}
          onValueChange={(value) => dispatch(setPriceFilter(value))}
        />
      </View>
      <Text style={styles.productCountText}>
        {productCount === 0
          ? 'Producto No Encontrado'
          : `Productos Encontrados: ${productCount}`}
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => {
              showProductDetails(product);
              // Agrego el producto al carrito utilizando la acción de Redux correspondiente
              dispatch(addToCartAction(product));
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  productCountText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    width: '100%',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    marginBottom: 16,
  },
});

export default ProductScreen;
