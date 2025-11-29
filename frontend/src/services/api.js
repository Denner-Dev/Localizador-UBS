import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Detecta se é emulador ou dispositivo físico
const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return "http://10.0.2.2:5000"; // Emulador Android
  }
  return "http://localhost:5000"; // iOS Simulator ou Web
};

const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
