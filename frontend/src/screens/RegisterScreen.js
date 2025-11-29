import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Erro", "Preencha os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/register", {
        nome,
        email,
        senha,
        cep,
        endereco,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      });

      Alert.alert("Sucesso", "Cadastro realizado! Faça login.");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />
      <TextInput placeholder="CEP" value={cep} onChangeText={setCep} style={styles.input} />
      <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} style={styles.input} />
      <TextInput placeholder="Latitude" value={latitude} onChangeText={setLatitude} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Longitude" value={longitude} onChangeText={setLongitude} style={styles.input} keyboardType="numeric" />
      <Button title={loading ? "Carregando..." : "Cadastrar"} onPress={handleRegister} disabled={loading} />
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
});
