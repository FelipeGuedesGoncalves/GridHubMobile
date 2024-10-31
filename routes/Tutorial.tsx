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
                    videoId={'8Sv-U5hERYE'}
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

// import YoutubePlayer from 'react-native-youtube-iframe';
// import React, {useState} from 'react';
// import {Button, View, Alert, Text, StyleSheet} from 'react-native';

// export default function Tutorial() {

//     const [playing, setPlaying] = useState(false);
//     const onStateChange = (state) => {
//       if (state === 'ended') {
//         setPlaying(false);
//         Alert.alert('video has finished playing!');
//       }
//     }
//     const togglePlaying = () => {
//       setPlaying((prev) => !prev);
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Tutorial</Text>
//             <View>
//       <YoutubePlayer
//         height={200}
//         width={300}
//         play={playing}
//         videoId={'84WIaK3bl_s'}
//         onChangeState={onStateChange}
//       />
//       <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
//     </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF', // Correspondente a @color/branco
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24, // Ajuste conforme o estilo de @style/TituloFragments
//         fontWeight: 'bold', // Pode ser ajustado conforme a estilização desejada
//         padding: 16,
//         color: '#9249FF'
//     },
// });

