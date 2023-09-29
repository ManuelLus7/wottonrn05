import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { connect } from 'react-redux';
import { addToCart } from '../redux/cartActions';
import { Colors } from "../constants/Colors";

const ProductCard = ({ product, addToCart }) => {
  const { name, description, price, stock, image } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Precio: ${price.toFixed(2)}</Text>
      <Text style={styles.stock}>Stock: {stock} units</Text>
      <Button title="Agregar al Carrito" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    width: "48%",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.text,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  stock: {
    fontSize: 14,
    color: Colors.text,
  },
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(null, mapDispatchToProps)(ProductCard);
