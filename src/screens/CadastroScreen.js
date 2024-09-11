import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function CadastroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Já possui uma conta? <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text  style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  Form: {
    width: '100%',
    padding: '0',
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 60,
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
