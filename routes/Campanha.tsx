import { appcolors } from '@/styles/appcolors';
import { globalstyles } from '@/styles/globalstyles';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Campanha() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Campanha de Investimento</Text>
            <Text style={styles.subtitle}>
                Descubra oportunidades incríveis na GridHub e torne-se parte da transformação energética. Navegue pelos microgrids cadastrados por usuários como você e encontre projetos que chamem sua atenção.
            </Text>
            <Text style={styles.subtitle}>
                Com apenas alguns cliques, envie sua solicitação de investimento diretamente ao dono da microgrid. Juntos, vocês podem negociar fora da plataforma os valores e condições do investimento.
            </Text>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>preencher com nome da microgrid retirado do banco de dados</Text>
                <Text style={styles.cardSubtitle}>Produz energia pelas fontes:</Text>
                <Text style={styles.cardContent}>preencher com fontes de energia microgrid retirado do banco de dados</Text>
                <Text style={styles.cardSubtitle}>Localizado no espaço:</Text>
                <Text style={styles.cardContent}>preencher com espaço retirado do banco de dados da microgrid</Text>
                <TouchableOpacity
                style={globalstyles.morebutton}
            >
                <Text style={globalstyles.morebuttontext}>Ver Mais</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        color: appcolors.azulescuro,
    },
    subtitle: {
        fontSize: 11,
        paddingHorizontal: 30,
        color: appcolors.azulescuro,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    card:{
        backgroundColor: appcolors.branco,
        width: '90%',
        elevation: 20,
        shadowRadius: 100,
        shadowOffset: { height: 10, width: 20 },
        shadowOpacity: 10,
        borderRadius: 30,
        padding: 20,
    },
    cardTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: appcolors.azulescuro,
    },
    cardSubtitle:{
        fontSize: 14,
        fontWeight: 'bold',
        color: appcolors.azulescuro,
        marginTop: 20
    },
    cardContent:{
        fontSize: 14,
        color: appcolors.azulescuro,
    },
});
