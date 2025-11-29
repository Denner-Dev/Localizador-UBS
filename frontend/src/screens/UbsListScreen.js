import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Alert, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import * as Location from "expo-location";

export default function UbsListScreen({ navigation }) {
  const [ubs, setUbs] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("LoginScreen");
  };

  useEffect(() => {
    const fetchUbs = async () => {
      try {
        // Verificar se o token existe
        const token = await AsyncStorage.getItem("token");
        console.log("Token found:", token ? "Yes" : "No");
        
        if (!token) {
          Alert.alert("Erro", "Token não encontrado. Faça login novamente");
          setLoading(false);
          return;
        }
        
        // Usando coordenadas fixas de São Paulo para teste
        const lat = -23.55052;
        const lng = -46.63331;
        
        console.log("Fetching UBS with coordinates:", lat, lng);
        const res = await api.get(`/ubs/perto?lat=${lat}&lng=${lng}`);
        console.log("UBS response:", res.data);
        setUbs(res.data);
      } catch (error) {
        console.log("Error details:", error);
        console.log("Error response:", error.response?.data);
        console.log("Error message:", error.message);
        console.log("Error status:", error.response?.status);
        Alert.alert("Erro", "Não foi possível buscar as UBSs próximas");
      } finally {
        setLoading(false);
      }
    };

    fetchUbs();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando UBSs próximas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      
      {ubs.length === 0 ? (
        <View style={styles.center}>
          <Text>Nenhuma UBS encontrada próxima da sua localização.</Text>
        </View>
      ) : (
        <FlatList
          data={ubs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
              {item.distancia && <Text style={styles.distancia}>Distância: {item.distancia} km</Text>}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#2c3e50",
    marginBottom: 5,
  },
  endereco: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  distancia: {
    fontSize: 12,
    color: "#3498db",
    fontWeight: "600",
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
