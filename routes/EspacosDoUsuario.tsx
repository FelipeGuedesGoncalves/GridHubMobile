import { appcolors } from '@/styles/appcolors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalstyles } from '@/styles/globalstyles';
import CadastroEspaco from './CadastroEspaco';


export default function EspacosDoUsuario( navigation ) {

    const cadastrarespaco = async () => {
        navigation.navigate('CadastroEspaco');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Espaços</Text>
            <TouchableOpacity onPress={cadastrarespaco} style={globalstyles.addbutton}><Text style={globalstyles.addbuttontext}>Adicionar Espaço</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        color: appcolors.azulescuro
    },
});
