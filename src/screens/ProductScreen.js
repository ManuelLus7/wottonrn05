import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { addToCart, loadProducts } from '../store/actions/productActions';

const ProductScreen = ({ products, addToCart, loadProducts }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    setIsLoading(false);
  }, []);

  console.log('Productos en el estado de Redux:', products);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Cargando los Productos...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.buttonText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={2} // Muestro los productos en dos columnas
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  productContainer: {
    flex: 1, // Me Aseguro que los productos se ajusten automáticamente a dos columnas
    backgroundColor: '#fff',
    margin: 5, // Espacio entre productos
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = {
  addToCart,
  loadProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
