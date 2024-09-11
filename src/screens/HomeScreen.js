import React from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';


export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo à Home</Text>
        <Button
          title="Ir para Sobre"
          onPress={() => navigation.navigate('CadastroScreen')}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },

});