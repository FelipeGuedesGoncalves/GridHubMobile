import Cadastro from '@/routes/Cadastro';
import Dashboard from '@/routes/Dashboard';
import Login from '@/routes/Login';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Profile from '@/routes/Profile';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
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
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                />
            </Stack.Navigator>
        </NavigationContainer>

    )

}
