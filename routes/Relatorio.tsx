import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Relatorio() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatório</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Correspondente a @color/branco
        alignItems: 'center',
    },
    title: {
        fontSize: 24, // Ajuste conforme o estilo de @style/TituloFragments
        fontWeight: 'bold', // Pode ser ajustado conforme a estilização desejada
        padding: 16,
        color: '#9249FF'
    },
});
