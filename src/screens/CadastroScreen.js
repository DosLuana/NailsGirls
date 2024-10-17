import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSignUp = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      console.log("Usuário criado com UID:", user.uid);

      await setDoc(doc(db, "users", user.uid), {
        name: nome,
        email: email,
        createdAt: new Date(), 
      });

      console.log("Nome e email salvos no Firestore.");

      await signInWithEmailAndPassword(auth, email, senha);
      console.log("Redirecionando para Login");

      navigation.navigate("LoginScreen"); 
    } catch (error) {
      console.error("Erro ao registrar ou logar usuário:", error);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário. ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
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
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Já possui uma conta?{" "}
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 60,
  },
  logo: {
    width: 200,
    height: 120,
  },
  form: {
    width: '100%',
    padding: 0,
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
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#393357",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  loginLink: {
    color: "#393357",
    fontWeight: "bold",
  },
});
