import React from 'react';
import { View, Text, Button } from 'react-native';

const ProductDetailScreen = ({ route, addToCart }) => {
  // Obtengo el producto de los parámetros de la ruta
  const { product } = route.params;

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price.toFixed(2)}</Text>
      <Button title="Agregar al Carrito" onPress={() => addToCart(product)} />
    </View>
  );
};

export default ProductDetailScreen;
