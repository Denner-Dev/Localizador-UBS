import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import showAlert, { showConfirm } from "../utils/alert";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        showAlert("Erro", "Não foi possível carregar os dados do perfil", "Erro");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = async () => {
    const confirmed = await showConfirm("Confirmar Logout", "Tem certeza que deseja sair da sua conta?");
    
    if (confirmed) {
      await AsyncStorage.removeItem("token");
      showAlert("Sucesso", "Logout realizado com sucesso!", "Sucesso");
      navigation.replace("LoginScreen");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      showAlert("Erro", "Dados do usuário não encontrados", "Erro");
      return;
    }
    
    const confirmed = await showConfirm("Excluir Conta", "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    
    if (confirmed) {
      try {
        console.log("Excluindo usuário ID:", user.id);
        const response = await api.delete(`/users/${user.id}`);
        console.log("Resposta da exclusão:", response.data);
        await AsyncStorage.removeItem("token");
        showAlert("Sucesso", "Conta excluída com sucesso!", "Sucesso");
        navigation.replace("LoginScreen");
      } catch (error) {
        console.log("Erro ao excluir:", error);
        showAlert("Erro", error.response?.data?.message || "Não foi possível excluir a conta", "Erro");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.label}>Nome Completo</Text>
          <Text style={styles.value}>{user?.nome}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>CEP</Text>
          <Text style={styles.value}>{user?.cep}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Endereço</Text>
          <Text style={styles.value}>{user?.endereco}</Text>
        </View>

        <View style={styles.locationSection}>
          <View style={styles.locationItem}>
            <Text style={styles.label}>Latitude</Text>
            <Text style={styles.value}>{user?.latitude}</Text>
          </View>
          <View style={styles.locationItem}>
            <Text style={styles.label}>Longitude</Text>
            <Text style={styles.value}>{user?.longitude}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Text style={styles.editText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDeleteAccount}
      >
        <Text style={styles.deleteText}>Excluir Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 32,
    color: "white",
  },
  infoSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#7f8c8d",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },
  locationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  locationItem: {
    flex: 1,
    marginHorizontal: 4,
  },

  editButton: {
    backgroundColor: "#3498db",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  editText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#95a5a6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});