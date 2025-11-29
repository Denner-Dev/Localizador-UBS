import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import UbsListScreen from './src/screens/UbsListScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={{
          headerStyle: { backgroundColor: '#3498db' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: '🏥 UBS Locator - Login' }} 
        />
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ title: '📝 Cadastro' }} 
        />
        <Stack.Screen 
          name="UBSScreen" 
          component={UbsListScreen} 
          options={{ 
            title: '🏥 UBS Próximas',
            headerLeft: null // Remove botão voltar
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// Registrar o componente principal
import { registerRootComponent } from 'expo';
registerRootComponent(App);
