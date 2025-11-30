import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import showAlert from "../utils/alert";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCEP = (cep) => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
  };

  const validateCoordinate = (coord, type) => {
    const num = parseFloat(coord);
    if (isNaN(num)) return false;
    if (type === 'lat') return num >= -90 && num <= 90;
    if (type === 'lng') return num >= -180 && num <= 180;
    return false;
  };

  // Validação de campos obrigatórios e limites
  const validateFields = () => {
    const errors = [];
    
    if (!nome || nome.length < 2) errors.push("Nome completo (mínimo 2 caracteres)");
    if (!email) errors.push("E-mail");
    else if (!validateEmail(email)) errors.push("E-mail válido");
    else if (email.length > 50) errors.push("E-mail (máximo 50 caracteres)");
    
    if (!senha || senha.length < 6 || senha.length > 100) errors.push("Senha (entre 6 e 100 caracteres)");
    
    if (!cep) errors.push("CEP");
    else if (!validateCEP(cep)) errors.push("CEP válido (00000-000)");
    
    if (!endereco) errors.push("Endereço");
    
    if (!latitude) errors.push("Latitude");
    else if (!validateCoordinate(latitude, 'lat')) errors.push("Latitude válida (-90 a 90)");
    
    if (!longitude) errors.push("Longitude");
    else if (!validateCoordinate(longitude, 'lng')) errors.push("Longitude válida (-180 a 180)");
    
    return errors;
  };

  // Função para processar o cadastro do usuário
  const handleRegister = async () => {
    const validationErrors = validateFields();
    
    // Verifica se há erros de validação
    if (validationErrors.length > 0) {
      showAlert(
        "Campos obrigatórios não preenchidos", 
        "Preencha os seguintes campos:\n\n• " + validationErrors.join("\n• "),
        "Erro"
      );
      return;
    }

    setLoading(true);
    try {
      // Envia dados para o backend
      const response = await api.post("/auth/register", {
        nome,
        email,
        senha,
        cep,
        endereco,
        latitude: parseFloat(latitude), // Converte para número
        longitude: parseFloat(longitude), // Converte para número
      });

      await showAlert("Sucesso", "Cadastro realizado! Faça login.", "Sucesso");
      navigation.navigate("LoginScreen");
    } catch (error) {
      // Trata erros de validação do backend
      const errorMessage = error.response?.data?.errors 
        ? "Erros encontrados:\n\n• " + error.response.data.errors.join("\n• ")
        : error.response?.data?.message || "Não foi possível cadastrar";
      showAlert("Erro", errorMessage, "Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput 
        placeholder="Nome completo *" 
        value={nome} 
        onChangeText={setNome} 
        style={styles.input} 
        maxLength={100}
      />
      <TextInput 
        placeholder="E-mail * (máx. 50 caracteres)" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none" 
        keyboardType="email-address"
        maxLength={50}
      />
      <TextInput 
        placeholder="Senha * (6-100 caracteres)" 
        value={senha} 
        onChangeText={setSenha} 
        style={styles.input} 
        secureTextEntry
        maxLength={100}
      />
      <TextInput 
        placeholder="CEP *" 
        value={cep} 
        onChangeText={setCep} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Endereço *" 
        value={endereco} 
        onChangeText={setEndereco} 
        style={styles.input} 
      />
      <TextInput 
        placeholder="Latitude *" 
        value={latitude} 
        onChangeText={setLatitude} 
        style={styles.input} 
        keyboardType="numeric" 
      />
      <TextInput 
        placeholder="Longitude *" 
        value={longitude} 
        onChangeText={setLongitude} 
        style={styles.input} 
        keyboardType="numeric" 
      />
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
