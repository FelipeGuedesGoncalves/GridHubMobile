import Cadastro from '@/routes/Cadastro';
import Dashboard from '@/routes/Dashboard';
import Login from '@/routes/Login';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export default function HomeScreen() {
  const Stack = createStackNavigator()
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
      />
      <Stack.Screen
        name='Cadastro'
        component={Cadastro}
      />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
      />
    </Stack.Navigator>
  )

  
}
