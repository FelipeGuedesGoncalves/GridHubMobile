import { appcolors } from "@/styles/appcolors"
import { View, Image, Text, StyleSheet, Dimensions } from "react-native"

export const oopsMessage = () => {
    return (
        <View style = {styles.box}>
            <Text style = {styles.oopsTitle}>Oops! Espera um pouquinho</Text>
            <Text style = {styles.oopsText}>Você ainda não tem nenhuma análise concluída ainda, volte aqui em tempo hábil para visualizá-las</Text>
            <Image
                source={require('@/assets/images/laptop3d.png')}
                style={styles.oopsImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    oopsImage: {
        width: 150,
        height: 150,
    },
    oopsText: {
        fontSize: 13,
        color: appcolors.roxoclaro,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        textAlign: 'center'
    },
    oopsTitle: {
        fontSize: 17,
        color: appcolors.roxo,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 10,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
    }
})