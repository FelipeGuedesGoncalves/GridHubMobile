import Cadastro from '@/routes/Cadastro';
import Dashboard from '@/routes/Dashboard';
import Login from '@/routes/Login';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from '@/routes/Profile';


export default function HomeScreen() {

  const Stack = createStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Cadastro'
        component={Cadastro}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
      />
    </Stack.Navigator>
  )

}

export const globalstyles = StyleSheet.create({
  largebutton: {
    width: 350,
    height: 60,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#ffffff0',
    color: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 'auto',
    height: 60,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 16,
    marginTop: 20,
    fontSize: 16,
    backgroundColor: '#ffffff0',
    color: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttontext: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  }
})
