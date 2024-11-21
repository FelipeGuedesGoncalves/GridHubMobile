import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import Cadastro from '@/routes/Cadastro';
import Login from '@/routes/Login';
import Profile from '@/routes/Profile';
import Campanha from './routes/Campanha';
import EspacosAlugaveis from './routes/EspacosAlugaveis';
import EspacosDoUsuario from './routes/EspacosDoUsuario';
import MicrogridsDoUsuario from './routes/MicrogridsDoUsuario';
import { appcolors } from './styles/appcolors';
import CadastroEspaco from './routes/CadastroEspaco';
import CadastroMicrogrids from './routes/CadastroMicrogrids';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Group>


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
        name="Campanha"
        component={Campanha}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/CampanhaFinanciamento.png')}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EspacosAlugaveis"
        component={EspacosAlugaveis}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/EspacosAlugaveis.png')}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="EspacosDoUsuario"
        component={EspacosDoUsuario}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/EspacosDoUsuario.png')}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MicrogridsDoUsuario"
        component={MicrogridsDoUsuario}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/Microgrids.png')}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <Image
              source={require('@/assets/images/PerfilDoUsuario.png')}
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
    backgroundColor: appcolors.azulescuro,
    elevation: 0,
    height: 87,
    justifyContent: 'center',
    paddingTop: 20
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#ffffff',
    height: 1.5,
  },
  tabBarItemStyle: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
