import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.LogoContainer}>
      <Image source={require('../../assets/icone-perfil.png')} style={styles.profileImage} />
      </View>
      <View style={styles.Form}>
        <TextInput style={styles.input} placeholder="Nome" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
        />
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Confirmar Alterações</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: -10,
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  Form: {
    width: '100%',
    padding: '0',
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    paddingHorizontal: 17,
    fontSize: 16,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    marginBottom: 15,
  },
  LogoContainer: {
    top: -15,
    padding: 35,
    justifyContent: 'center',
    backgroundColor: "#D9D9D9",
    borderRadius: '100%',
    marginBottom: 20,
  },
  profileImage: {
    backgroundColor: '#d9d9d9',
    width: 120,
    height: 120,
    borderRadius: '100%',

  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  editButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#393357',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
