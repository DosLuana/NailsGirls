import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { getAuth, updatePassword, updateEmail, signOut, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); 
  const [senhaConfirmacao, setSenhaConfirmacao] = useState(''); 

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNome(userData.name);
          setEmail(userData.email);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getErrorMessage = (error) => {
    if (error.code === 'auth/user-not-found') {
      return 'Usuário não encontrado';
    }
    if (error.code === 'auth/wrong-password') {
      return 'Senha inválida';
    }
    return error.message;
  };

  const reauthenticate = async (password) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credential);
      console.log('Reautenticação bem-sucedida.');
    } catch (error) {
      console.error('Erro ao reautenticar:', error);
      Alert.alert('Erro', 'Reautenticação falhou. Por favor, verifique sua senha.');
      throw error;
    }
  };

  const handleSave = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não correspondem.');
      return;
    }

    setModalVisible(true);
  };

  const handleConfirmSave = async () => {
    try {
      await reauthenticate(senhaConfirmacao);

      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: nome,
      });

      if (email !== user.email) {
        await updateEmail(user, email);
        console.log('E-mail atualizado com sucesso.');
        Alert.alert('Sucesso', 'E-mail atualizado com sucesso! Faça login novamente.');
        
        await signOut(auth);
        navigation.replace('Inicio');
        return;
      }

      if (senha) {
        await updatePassword(user, senha);
        console.log('Senha atualizada com sucesso.');
        Alert.alert('Sucesso', 'Dados e senha atualizados com sucesso!');

        await signOut(auth);
        navigation.replace('Inicio');
        console.log('Logout realizado com sucesso após a atualização da senha.');
        Alert.alert('Você foi desconectado. Por favor, faça login novamente com a nova senha.');
      } else {
        console.log('Dados atualizados sem alteração de senha.');
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      Alert.alert('Erro', errorMessage);
      console.error('Erro ao atualizar dados:', errorMessage);
    } finally {
      setModalVisible(false); 
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Sucesso', 'Você foi desconectado.');
      navigation.replace('Inicio');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.LogoContainer}>
        <Image source={require('../../assets/icone-perfil.png')} style={styles.profileImage} />
      </View>
      <Text style={styles.title}>Editar Perfil</Text>
      <View style={styles.Form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonLogout]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirme sua senha</Text>
            <Text style={[styles.modalSubtitle, { textAlign: 'center', fontSize: 15, marginBottom: 15}]}>Digite sua senha atual para continuar com as alterações.</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senhaConfirmacao}
              onChangeText={setSenhaConfirmacao}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleConfirmSave}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  Form: {
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
    marginTop: 10,
  },
  buttonLogout: {
    width: '100%',
    height: 55,
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  LogoContainer: {
    top: -15,
    padding: 35,
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: '100%',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
