import { Platform, Alert } from 'react-native';

// Função simples que funciona tanto no mobile quanto no web
export const showAlert = (title, message, type = 'info') => {
  if (Platform.OS === 'web') {
    // No web, usa alert nativo do browser
    window.alert(`${title}\n\n${message}`);
  } else {
    // No mobile, usa Alert nativo do React Native
    Alert.alert(title, message);
  }
};

// Função para confirmação
export const showConfirm = (title, message) => {
  if (Platform.OS === 'web') {
    // No web, usa confirm nativo do browser
    return window.confirm(`${title}\n\n${message}`);
  } else {
    // No mobile, usa Alert nativo com botões
    return new Promise((resolve) => {
      Alert.alert(
        title,
        message,
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
          { text: 'Sim', onPress: () => resolve(true) }
        ]
      );
    });
  }
};

export default showAlert;