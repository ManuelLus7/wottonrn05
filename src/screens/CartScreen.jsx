import React from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  clearCart,
} from '../redux/cartActions'; // Asegúrate de importar las acciones correctas desde tu archivo cartActions.js

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseCartItemQuantity(item.id));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseCartItemQuantity(item.id));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleCheckout = () => {
    // Aquí puedes implementar la lógica de pago
    console.log('Procesando el pago...');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Precio: ${item.price.toFixed(2)}</Text>
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
      <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
      <Button title="Vaciar Carrito" onPress={handleClearCart} />
      <Button title="Pagar" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
