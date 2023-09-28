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

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseCartItemQuantity(item.id));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQuantity(item.id));
    } else {
      // Muestra una alerta si el usuario intenta reducir la cantidad a menos de 1
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
    // Muestra una alerta de confirmación antes de vaciar el carrito
    Alert.alert('Confirmación', '¿Seguro que deseas vaciar el carrito?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Vaciar',
        onPress: () => dispatch(clearCart()),
        style: 'destructive',
      },
    ]);
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      // Muestra una alerta si el carrito está vacío al intentar pagar
      Alert.alert('Aviso', 'El carrito está vacío.');
    } else {
      // Aquí puedes implementar la lógica de pago real
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
