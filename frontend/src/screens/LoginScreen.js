import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha email e senha");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, senha });
      const token = response.data.token;

      // Salva o token no AsyncStorage
      await AsyncStorage.setItem("token", token);

      // Navega para tela de UBS (replace para não voltar)
      navigation.replace("UBSScreen");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Erro", "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      <Button title={loading ? "Carregando..." : "Entrar"} onPress={handleLogin} disabled={loading} />
      <Text
        style={styles.registerLink}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Não tem conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20,
    backgroundColor: "#f8f9fa"
  },
  title: { 
    fontSize: 28, 
    marginBottom: 30, 
    textAlign: "center",
    fontWeight: "bold",
    color: "#2c3e50"
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    padding: 15, 
    marginBottom: 15, 
    borderRadius: 8,
    backgroundColor: "white",
    fontSize: 16
  },
  registerLink: { 
    marginTop: 20, 
    color: "#3498db", 
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline"
  },
});
