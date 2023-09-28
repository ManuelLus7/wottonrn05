import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/productSlice';
import { ProductCard, SearchBar } from '../components';
import { products } from '../data/ProductsData';
import { Ionicons } from '@expo/vector-icons';
import { addToCart as addToCartAction } from '../store/cartSlice';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.products.searchTerm);

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const clearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  const showProductDetails = (selectedProduct) => {
    console.log(`Mostrar detalles del producto: ${selectedProduct.name}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCartAction(product)); // Agrega el producto al carrito
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
      <ScrollView contentContainerStyle={styles.container}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => {
              showProductDetails(product);
              handleAddToCart(product); // Agrega el producto al carrito al hacer clic
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
});

export default ProductScreen;
