import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export default function EditProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user.nome || !user.cep || !user.endereco) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    setSaving(true);
    try {
      console.log("Salvando dados:", {
        nome: user.nome,
        cep: user.cep,
        endereco: user.endereco,
        latitude: user.latitude,
        longitude: user.longitude
      });
      
      const response = await api.put(`/users/${user.id}`, {
        nome: user.nome,
        cep: user.cep,
        endereco: user.endereco,
        latitude: user.latitude,
        longitude: user.longitude
      });
      
      console.log("Resposta da API:", response.data);
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao salvar:", error.response?.data || error.message);
      Alert.alert("Erro", error.response?.data?.message || "Não foi possível atualizar o perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={user.nome}
          onChangeText={(text) => setUser({...user, nome: text})}
          placeholder="Digite seu nome completo"
        />

        <Text style={styles.label}>CEP</Text>
        <TextInput
          style={styles.input}
          value={user.cep}
          onChangeText={(text) => setUser({...user, cep: text})}
          placeholder="00000-000"
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={user.endereco}
          onChangeText={(text) => setUser({...user, endereco: text})}
          placeholder="Rua, número, bairro"
        />

        <Text style={styles.label}>Latitude</Text>
        <TextInput
          style={styles.input}
          value={user.latitude?.toString()}
          onChangeText={(text) => setUser({...user, latitude: parseFloat(text)})}
          placeholder="-23.55052"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Longitude</Text>
        <TextInput
          style={styles.input}
          value={user.longitude?.toString()}
          onChangeText={(text) => setUser({...user, longitude: parseFloat(text)})}
          placeholder="-46.63331"
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={[styles.saveButton, saving && styles.disabled]} 
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveText}>
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#27ae60",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});