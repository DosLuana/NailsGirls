import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from './firebaseconfig'; 
import { updatePassword } from 'firebase/auth';

export default RedefinirSenhaScreen = ({ navigation }) => {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRedefinirSenha = () => {
    if (novaSenha !== confirmaSenha) {
      setMensagem('As senhas não coincidem.');
      return;
    }

    const user = auth.currentUser; 

    if (user) {
      updatePassword(user, novaSenha)
        .then(() => {
          setMensagem('Senha redefinida com sucesso!');
        })
        .catch((error) => {
          setMensagem('Erro ao redefinir a senha: ' + error.message);
        });
    } else {
      setMensagem('Usuário não autenticado.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Redefina sua senha</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRedefinirSenha}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        
        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Voltar</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  formContainer: {
    width: '100%',
    padding: 40,
    backgroundColor: '#D3D3D3',
    borderRadius: 40,
    alignItems: 'center',
    paddingTop: 40,
    marginTop: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4B3F72',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mensagem: {
    marginTop: 20,
    color: '#4B3F72', 
    textAlign: 'center',
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


