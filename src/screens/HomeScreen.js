import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper'; // Import correto do Swiper

const { width } = Dimensions.get('window');

import imagem1 from '../img/image 1.png';
import imagem2 from '../img/image 3.png';
import imagem3 from '../img/image 4.png';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.buttonLarge}>
          <Text style={styles.buttonText}>Unhas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={3} // Tempo entre as transições automáticas
          showsPagination={false} // Mostra os pontos de paginação
          loop={true} // Permite looping infinito
        >
          <View style={styles.slide}>
            <Image source={require('../img/image 1.png')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../img/image 3.png')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../img/image 4.png')} style={styles.image} />
          </View>
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
  },
  buttonLarge: {
    backgroundColor: '#A020F0',
    width: '90%',
    height: 80,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  swiperContainer: {
    height: 200,
    width: '100%', // A largura do Swiper deve ocupar a tela
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta a imagem para cobrir o slide
  },
  touchable: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FF69B4',
    padding: 10,
    borderRadius: 5,
  },
  touchableText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Home;