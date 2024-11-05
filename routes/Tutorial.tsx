import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


export default function Tutorial() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tutorial</Text>
            <View>
                <YoutubePlayer
                    height={200}
                    width={300}
                    play={false}
                    videoId={'B6ZZIZmo8L0'}
                />
            </View>
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
