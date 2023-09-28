import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCart,
} from '../store/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.products);

  const getProductById = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const handleIncreaseQuantity = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(increaseCartItemQuantity({ itemId: item.id, quantity: newQuantity }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQuantity(item.id));
    } else {
      Alert.alert('Aviso', '¿Eliminar este producto del carrito?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => handleRemoveItem(item),
          style: 'destructive',
        },
      ]);
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleClearCart = () => {
    Alert.alert('Confirmación', '¿Seguro que deseas vaciar el carrito?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Vaciar',
        onPress: async () => {
          dispatch(clearCart());
          // await AsyncStorage.removeItem(CART_STORAGE_KEY); // Asegúrate de importar AsyncStorage si es necesario
        },
        style: 'destructive',
      },
    ]);
  };

  const calculateSubtotal = (item) => {
    const product = getProductById(item.id);
    return product ? product.price * item.quantity : 0;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Aviso', 'El carrito está vacío.');
    } else {
      console.log('Procesando el pago...');
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => (item.id ? item.id.toString() : '')}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {getProductById(item.id) && (
                <Image source={{ uri: getProductById(item.id).image }} style={styles.itemImage} />
              )}
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {getProductById(item.id) ? getProductById(item.id).name : 'Producto no encontrado'}
                </Text>
                <Text style={styles.itemPrice}>
                  Precio: ${getProductById(item.id) ? getProductById(item.id).price.toFixed(2) : '0.00'}
                </Text>
                <View style={styles.quantityContainer}>
                  <Button title="-" onPress={() => handleDecreaseQuantity(item)} />
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <Button title="+" onPress={() => handleIncreaseQuantity(item)} />
                </View>
                <Text style={styles.itemSubtotal}>
                  Subtotal: ${calculateSubtotal(item).toFixed(2)}
                </Text>
                <Button title="Eliminar" onPress={() => handleRemoveItem(item)} />
              </View>
            </View>
          )}
        />
      )}
      {cartItems.length > 0 && (
        <>
          <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
          <Button title="Vaciar Carrito" onPress={handleClearCart} />
          <Button title="Pagar" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  itemSubtotal: {
    fontSize: 16,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default CartScreen;
