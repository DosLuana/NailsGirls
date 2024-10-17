import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../../assets/INICIO.png')} style={styles.logo} />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.welcomeText}>Bem vindo a Nails Girls!</Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('CadastroScreen')}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button2} 
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
    justifyContent: 'flex-end',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  bottomSection: {
    backgroundColor: '#463364',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30, 
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 20, 
    marginBottom: 20,
  },
  button2: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 134,
    borderRadius: 20, 
    marginBottom: 60,
  },
  buttonText: {
    color: '#463364',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
