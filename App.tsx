import Cadastro from '@/routes/Cadastro';
import Dashboard from '@/routes/Dashboard';
import Login from '@/routes/Login';
import Profile from '@/routes/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Relatorio from './routes/Relatorio';
import Tutorial from './routes/Tutorial';
import AnaliseIndividual from './routes/AnaliseIndividual';

// Criação dos navegadores
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Grupo de telas não autenticadas */}
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Group>

        {/* Grupo de telas autenticadas */}
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MyTabs" component={MyTabs} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/dashboardicon.png')}
              style={styles.tabIcon}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Relatorio" 
        component={Relatorio}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/papericon.png')}
              style={styles.tabIcon}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Analise individual" 
        component={AnaliseIndividual}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/analiseindividualicon.png')}
              style={styles.tabIcon}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Tutorial" 
        component={Tutorial}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/tutorialicon.png')}
              style={styles.tabIcon}
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/profileicon.png')}
              style={styles.tabIcon}
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

// Estilos
const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#6200ee', // Cor de fundo similar ao gradient
    elevation: 0, // Remove a sombra
    borderBottomWidth: 1, // Borda inferior
    borderBottomColor: '#bbb', // Cor da borda
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'yellow', // Indicador em amarelo
    height: 4, // Altura do indicador
    borderRadius: 2, // Borda arredondada do indicador
  },
  tabBarItemStyle: {
    flex: 1, // Ocupa o espaço igual entre as abas
    alignItems: 'center', // Centraliza o conteúdo
  },
  tabIcon: {
    width: 30, // Largura do ícone
    height: 30, // Altura do ícone
  },
});
