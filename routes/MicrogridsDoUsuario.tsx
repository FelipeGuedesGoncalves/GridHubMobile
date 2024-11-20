import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function MicrogridsDoUsuario() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minhas Microgrids</Text>
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
        color: '#9249FF'
    },
});