import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { connect } from "react-redux";
import { Video } from "expo-av";
import { Card } from "react-native-elements";
import { loadProducts } from "../store/actions/productActions";
import Carousel from 'react-native-snap-carousel';
import { spotify } from '../data/spotify';

const HomeScreen = ({ products, loadProducts }) => {
  const [randomProducts, setRandomProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState(null);

  useEffect(() => {
    // Cargo los productos desde Redux
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    // Cuando los productos se cargan o actualizan, los mezclo aleatoriamente seleccionando 10
    if (products.length > 0) {
      const shuffledProducts = shuffleArray(products);
      setRandomProducts(shuffledProducts.slice(0, 10));
      const selectedRandomProduct =
        shuffledProducts[Math.floor(Math.random() * shuffledProducts.length)];
      console.log("selectedRandomProduct:", selectedRandomProduct);
      setRandomProduct(selectedRandomProduct);
    }
  }, [products]);

  // Función para mezclar aleatoriamente el array
  function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Sección de Video */}
      <View style={styles.videoContainer}>
        <Video
          source={{
            uri: "https://cdn.sanity.io/files/27438tds/rexona-prod-ar/475f0e1a24393fcdcbc6424b6c5ab6bcf752fbf5.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls={false}
          isLooping // Reproduzco el Video Continuamente
          style={styles.video}
        />
      </View>

      {/* Sección de Productos Aleatorios */}
      <View style={styles.productsContainer}>
        <Text style={styles.productTitle}>Productos Aleatorios</Text>
        <ScrollView horizontal>
          {randomProducts.map((item) => (
            <Card key={item.id} containerStyle={styles.productCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName}>{item.name}</Text>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Sección de Carrusel de Spotify */}
      <View style={styles.spotifyCarouselContainer}>
        <Text style={styles.infoTitle}>¡Escucha nuestras playlists en Spotify!</Text>
        <Carousel
          data={spotify}
          renderItem={({ item }) => (
            <View style={styles.spotifyItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.spotifyItemImage}
                resizeMode="contain"
              />
              <Text style={styles.spotifyItemName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.spotifyLinkButton}
                onPress={() => {
                  // Abre el enlace de Spotify en la aplicación de Spotify
                  Linking.openURL(item.link);
                }}
              >
                <Text style={styles.spotifyLinkButtonText}>Escuchar en Spotify</Text>
              </TouchableOpacity>
            </View>
          )}
          sliderWidth={300}
          itemWidth={250}
          loop={true}
          autoplay={true}
          autoplayDelay={2000}
          autoplayInterval={5000}
        />
      </View>

      
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = {
  loadProducts,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  videoContainer: {
    height: 200,
  },
  video: {
    flex: 1,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  randomProductInfo: {
    marginBottom: 16,
    alignItems: "center",
  },
  randomProductImage: {
    height: 150,
  },
  randomProductName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  randomProductDescription: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  productsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productCard: {
    width: 200,
    marginRight: 10,
  },
  productImage: {
    height: 150,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  randomProductInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  descriptionContainer: {
    flex: 2,
    marginLeft: 5,
  },
  spotifyCarouselContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  spotifyItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 10,
  },
  spotifyItemImage: {
    width: 200,
    height: 200,
  },
  spotifyItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  spotifyLinkButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  spotifyLinkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
