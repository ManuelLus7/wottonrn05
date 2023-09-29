import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCartAction } from '../redux/cartReducers'; // Importa la acción addToCartAction desde el archivo adecuado

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const addToCart = () => {
    // Agrega el producto al carrito utilizando la acción de Redux correspondiente
    dispatch(addToCartAction(product));
  };

  return (
    <View>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price.toFixed(2)}</Text>
      <Button title="Agregar al Carrito" onPress={addToCart} />
    </View>
  );
};

export default ProductDetailScreen;
