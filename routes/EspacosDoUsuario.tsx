import { appcolors } from '@/styles/appcolors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function EspacosDoUsuario() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Espaços
        </Text>
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
