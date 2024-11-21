import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { appcolors } from '@/styles/appcolors';
import { globalstyles } from '@/styles/globalstyles';
import CadastroEspaco from './CadastroEspaco'; // Importando o componente de cadastro

const Stack = createStackNavigator();

function EspacosDoUsuarioScreen({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <View style={styles.listaContainer}>
                <Text style={styles.title}>Meus Espaços</Text>
                <TouchableOpacity
                    style={globalstyles.addbutton}
                    onPress={() => navigation.navigate('CadastroEspaco')}
                >
                    <Text style={globalstyles.addbuttontext}>Adicionar Espaço</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function EspacosDoUsuario() {
    return (
        <Stack.Navigator initialRouteName="EspacosDoUsuarioScreen">
            <Stack.Screen
                name="EspacosDoUsuarioScreen"
                component={EspacosDoUsuarioScreen}
                options={{
                    title: 'Meus Espaços',
                    headerShown: false, // Ocultando o cabeçalho nesta tela
                }}
            />
            <Stack.Screen
                name="CadastroEspaco"
                component={CadastroEspaco}
                options={{
                    title: 'Meus Espaços',
                    headerShown: false, // Ocultando o cabeçalho nesta tela
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    listaContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        color: appcolors.azulescuro,
    },
});
