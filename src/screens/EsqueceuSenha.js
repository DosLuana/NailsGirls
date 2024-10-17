import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebaseconfig'; 
import { useNavigation } from '@react-navigation/native';

export default function EsqueceuSenha() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleRecoverPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage('E-mail de recuperação enviado com sucesso!');
        Alert.alert('Sucesso', 'Verifique seu e-mail para redefinir sua senha.');
      })
      .catch((error) => {
        console.error('Erro ao enviar e-mail de recuperação:', error);
        Alert.alert('Erro', 'Erro ao enviar e-mail de recuperação: ' + error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Recupere sua senha</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Digite seu E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#A6A6A6"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleRecoverPassword}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -70,
  },
  formContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#A6A6A6',
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#393357',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    fontSize: 14,
    color: '#3B3B98',
  },
  goBackButton: {
    marginTop: 20,
  },
  goBackText: {
    color: '#3B3B98',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
