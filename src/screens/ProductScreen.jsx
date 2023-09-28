import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setCategoryFilter,
  setPriceFilter,
} from '../store/productSlice';
import { ProductCard, SearchBar } from '../components';
import { products } from '../data/ProductsData';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {
  addToCart as addToCartAction,
  clearCart as clearCartAction,
} from '../store/cartSlice';

// Importa las funciones de AsyncStorage que hemos creado
import { saveCartToStorage, loadCartFromStorage } from '../store/cartStorage';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const categoryFilter = useSelector((state) => state.products.categoryFilter);
  const priceFilter = useSelector((state) => state.products.priceFilter);
  const cart = useSelector((state) => state.cart.items);

  const [searchTerm, setSearchTerm] = useState('');

  const productCount = filteredProducts.length;

  // Cargar el carrito desde AsyncStorage al iniciar la aplicación
  const loadCart = useCallback(async () => {
    try {
      const loadedCart = await loadCartFromStorage();
      dispatch(addToCartAction(loadedCart)); // Utiliza addToCart en lugar de loadCartAction
    } catch (error) {
      console.error('Error al cargar el carrito desde AsyncStorage:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const applyFilter = () => {
    const filtered = products.filter((product) => {
      const nameMatches = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatches = categoryFilter === 'All' || product.category === categoryFilter;
      const priceMatches = priceFilter === 1000 || product.price <= priceFilter;

      return nameMatches && categoryMatches && priceMatches;
    });
    dispatch(setProducts(filtered));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(setCategoryFilter('All'));
    dispatch(setPriceFilter(1000));
    dispatch(setProducts(products));
    applyFilter();
  };

  const clearSearch = () => {
    setSearchTerm('');
    dispatch(setCategoryFilter('All'));
    dispatch(setPriceFilter(1000));
    dispatch(setProducts(products));
  };

  const showProductDetails = (selectedProduct) => {
    console.log(`Mostrar detalles del producto: ${selectedProduct.name}`);
  };

  // Obtener una lista de todas las categorías disponibles en los productos
  const allCategories = [...new Set(products.map((product) => product.category))];

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
          {allCategories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
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
              handleAddToCart(product);
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
