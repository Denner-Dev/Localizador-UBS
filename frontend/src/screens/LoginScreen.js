import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para processar o login do usuário
  const handleLogin = async () => {
    const errors = [];
    
    // Validação de campos obrigatórios
    if (!email) errors.push("Email");
    else if (!validateEmail(email)) errors.push("Email válido");
    
    if (!senha || senha.length < 6) errors.push("Senha (mínimo 6 caracteres)");
    
    if (errors.length > 0) {
      Alert.alert(
        "Campos obrigatórios não preenchidos", 
        "Preencha os seguintes campos:\n\n• " + errors.join("\n• ")
      );
      return;
    }

    setLoading(true);
    try {
      // Autentica no backend
      const response = await api.post("/auth/login", { email, senha });
      const token = response.data.token;

      // Salva email para autenticação
      await AsyncStorage.setItem("email", email);
      // Salva o id do usuário para uso futuro
      //await AsyncStorage.setItem("userId", response.data.userId.toString());
      // Salva token JWT para autenticação
      await AsyncStorage.setItem("token", token);

      // Navega para tela principal (replace impede voltar)
      navigation.replace("UBSScreen");
    } catch (error) {
      Alert.alert("Erro", "Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email *"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        maxLength={50}
      />
      <TextInput
        placeholder="Senha *"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
        maxLength={100}
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
