import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { dadosIniciaisAnalise } from '@/models/dadosIniciaisAnalise';
import { BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard() {
    const [analysisData, setAnalysisData] = useState(dadosIniciaisAnalise); // Usa a estrutura inicial

    useEffect(() => {
        const fetchAnalysisData = async () => {
            const user = auth.currentUser;
            if (user) {
                const analysisRef = database.ref(`analises/${user.uid}`);
                analysisRef.on('value', (snapshot) => {
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

    // Preparando os dados para os gráficos
    const atividadesConcluidas = parseInt(analysisData.hoje.atividadesConcluidas) || 0;
    const atividadesInacabadas = parseInt(analysisData.hoje.atividadesInacabadas) || 0;
    
    const funcoesMaisUtilizadasColors = [
        '#FF6384', // Cor para a primeira função
        '#36A2EB', // Cor para a segunda função
        '#FFCE56', // Cor para a terceira função
        '#4BC0C0', // Cor para a quarta função
        '#9966FF', // Cor para a quinta função
        '#FF9F40', // Cor para a sexta função
    ];
    
    const funcoesMaisUtilizadasData = Object.entries(analysisData.hoje.funcoesMaisUtilizadas).map(([funcao, valor], index) => ({
        name: funcao,
        population: parseInt(valor) || 0,
        color: funcoesMaisUtilizadasColors[index % funcoesMaisUtilizadasColors.length], // Atribui cor baseado no índice
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));
    

    const utilizacaoDeFuncoes = [
        {
            name: "Utilizadas",
            population: parseInt(analysisData.hoje.utilizacaoDeFuncoes.funcoesUtilizadas) || 0,
            color: "#00FF00", // Verde
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Não Utilizadas",
            population: parseInt(analysisData.hoje.utilizacaoDeFuncoes.funcoesNaoUtilizadas) || 0,
            color: "#FF0000", // Vermelho
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    const tempoInatividade = parseInt(analysisData.hoje.tempoInatividade) || 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {analysisData ? (
                    <>

                        
                        <Text style={styles.sectionTitle}>Atividades Concluídas e Inacabadas</Text>
                        <BarChart
                            data={{
                                labels: ["Concluídas", "Inacabadas"],
                                datasets: [
                                    {
                                        data: [atividadesConcluidas, atividadesInacabadas]
                                    }
                                ]
                            }}
                            yAxisLabel=''
                            yAxisSuffix=''
                            width={screenWidth}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#fff',
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />

                        <Text style={styles.sectionTitle}>Funções Mais Utilizadas</Text>
                        <PieChart
                            data={funcoesMaisUtilizadasData}
                            width={screenWidth}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#fff',
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[10, 50]}
                            absolute
                        />

                        <Text style={styles.sectionTitle}>Tempo de Inatividade</Text>
                        <ProgressChart
                            data={{
                                labels: ["Inatividade"], // opcional
                                data: [tempoInatividade / 60] // Normaliza para um valor entre 0 e 1
                            }}
                            width={screenWidth}
                            height={220}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={{
                                backgroundColor: '#fff',
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            hideLegend={false}
                        />

                        <Text style={styles.sectionTitle}>Funções Utilizadas</Text>
                        <PieChart
                            data={utilizacaoDeFuncoes}
                            width={screenWidth}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#fff',
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            accessor={"population"}
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[10, 50]}
                            absolute
                        />

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
