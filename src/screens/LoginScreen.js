import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseconfig';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado com sucesso!');
      navigation.navigate('AppTabs');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro', 'E-mail ou senha incorreta.');
    }
  };

  const goToForgotPassword = () => {
    navigation.navigate('EsqueceuSenha');
  };

  const goToSignUp = () => {
    navigation.navigate('CadastroScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        {/* Alinhando o texto "Esqueceu sua senha?" acima do botão e à esquerda */}
        <TouchableOpacity onPress={goToForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.signupText}>Não tem conta? <Text style={styles.signupText2}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#FF69B4',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    paddingHorizontal: 17,
    fontSize: 16,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#393357',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#393357',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'left',
    left: 5,
  },
  signupText: {
    color: '#393357',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
  },
  signupText2: {
    fontWeight: 'bold',
  },
});
