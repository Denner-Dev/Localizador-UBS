import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import showAlert from "../utils/alert";
import * as Location from "expo-location";

export default function EditProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        showAlert("Permissão Negada", "Para obter sua localização, é necessário permitir o acesso à localização nas configurações do seu dispositivo.", "Erro");
        setLocationLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000
      });
      
      setUser({
        ...user,
        latitude: parseFloat(location.coords.latitude.toFixed(6)),
        longitude: parseFloat(location.coords.longitude.toFixed(6))
      });
      showAlert("Sucesso", "Localização obtida com sucesso!", "Sucesso");
    } catch (error) {
      console.log("Erro de localização:", error);
      showAlert("Erro", "Não foi possível obter a localização. Verifique se o GPS está ativado.", "Erro");
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        showAlert("Erro", "Não foi possível carregar os dados", "Erro");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!user.nome || !user.cep || !user.endereco) {
      showAlert("Erro", "Preencha todos os campos obrigatórios", "Erro");
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
      showAlert("Sucesso", "Perfil atualizado com sucesso!", "Sucesso");
      navigation.goBack();
    } catch (error) {
      console.log("Erro ao salvar:", error.response?.data || error.message);
      showAlert("Erro", error.response?.data?.message || "Não foi possível atualizar o perfil", "Erro");
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

        <Text style={styles.label}>Localização</Text>
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, styles.locationInput]}
            value={user.latitude?.toString()}
            onChangeText={(text) => setUser({...user, latitude: parseFloat(text)})}
            placeholder="Latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.locationInput]}
            value={user.longitude?.toString()}
            onChangeText={(text) => setUser({...user, longitude: parseFloat(text)})}
            placeholder="Longitude"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={getCurrentLocation}
          disabled={locationLoading}
        >
          <Text style={styles.locationButtonText}>
            {locationLoading ? "Obtendo localização..." : "📍 Obter Minha Localização"}
          </Text>
        </TouchableOpacity>

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
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0
  },
  locationInput: {
    flex: 1,
    marginHorizontal: 5
  },
  locationButton: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  locationButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600"
  },
});