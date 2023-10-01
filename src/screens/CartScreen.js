import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../store/actions/productActions';

const CartScreen = ({ cart, removeFromCart, incrementQuantity, decrementQuantity }) => {
  useEffect(() => {
    console.log('Componente CartScreen se redibujó');
  }, [cart]);

  const handleConfirmRemove = (productId) => {
    console.log('Eliminar producto con ID:', productId); 
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            removeFromCart(productId);
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decrementQuantity(item.id)}
              style={styles.quantityButton}
              disabled={item.quantity === 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => incrementQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemSubtotal}>Subtotal: ${item.subtotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity onPress={() => handleConfirmRemove(item.id)} style={styles.removeItemButton}>
          <Text style={styles.removeItemButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
      />

      <Text style={styles.total}>Total a Pagar: ${total.toFixed(2)}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
  },
  itemInfoContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginLeft:4,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
  },
  removeItemButton: {
    backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeItemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  confirmButton: {
    backgroundColor: 'green',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  
});


export default connect(mapStateToProps, {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
})(CartScreen);
