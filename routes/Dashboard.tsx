import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { dadosIniciaisAnalise } from '@/models/dadosIniciaisAnalise';

export default function Dashboard() {
    const [analysisData, setAnalysisData] = useState(dadosIniciaisAnalise); // Usa a estrutura inicial

    useEffect(() => {
        const fetchAnalysisData = async () => {
            const user = auth.currentUser;
            if (user) {
                const analysisRef = database.ref(`analises/${user.uid}`);
                analysisRef.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        setAnalysisData(snapshot.val());
                    } else {
                        console.log('No analysis data available');
                    }
                });
            }
        };
        fetchAnalysisData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {analysisData ? (
                    <>
                        <Text style={styles.sectionTitle}>Análise de Hoje</Text>
                        <Text>Atividades Concluídas: {analysisData.hoje.atividadesConcluidas}</Text>
                        <Text>Atividades Inacabadas: {analysisData.hoje.atividadesInacabadas}</Text>
                        <Text>Tempo de Inatividade: {analysisData.hoje.tempoInatividade} minutos</Text>
                        
                        <Text style={styles.sectionTitle}>Funções Mais Utilizadas Hoje</Text>
                        {Object.entries(analysisData.hoje.funcoesMaisUtilizadas).map(([funcao, valor]) => (
                            <Text key={funcao}>{funcao}: {valor}</Text>
                        ))}

                        <Text style={styles.sectionTitle}>Utilização de Funções Hoje</Text>
                        <Text>Funções Utilizadas: {analysisData.hoje.utilizacaoDeFuncoes.funcoesUtilizadas}</Text>
                        <Text>Funções Não Utilizadas: {analysisData.hoje.utilizacaoDeFuncoes.funcoesNaoUtilizadas}</Text>
                        
                    </>
                ) : (
                    <Text>Carregando dados de análise...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        color: '#9249FF',
    },
    scrollView: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 8,
    },
});
