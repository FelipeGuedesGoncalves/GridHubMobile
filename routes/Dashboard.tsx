import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { dadosIniciaisAnalise } from '@/models/dadosIniciaisAnalise';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { appcolors } from '@/styles/appcolors';

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

    const barData = [
        {
            value: parseInt(analysisData.hoje.atividadesConcluidas || '0'),
            label: 'Concluídas',
            frontColor: appcolors.roxo,
            spacing: 2,
        },
        {
            value: parseInt(analysisData.hoje.atividadesInacabadas || '0'),
            label: 'Inacabadas',
            frontColor: appcolors.roxoclaro,
            spacing: 20,
        },
    ];

    const renderLegendGraphic1 = () => {
        return (
            <View style={{ width:'100%', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: appcolors.roxo, marginRight: 8 }} />
                    <Text>Concluídas</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: appcolors.roxoclaro, marginRight: 8 }} />
                    <Text>Inacabadas</Text>
                </View>
            </View>
        );
    };

    const colors = [
        appcolors.roxoescuro,
        appcolors.roxomedio,
        appcolors.roxo,
        appcolors.roxoleve,
        appcolors.roxoclaro,
        appcolors.lilas,
        appcolors.branco,
        appcolors.Preto
    ];

    const funcoesMaisUtilizadasData = Object.entries(analysisData.hoje.funcoesMaisUtilizadas)
        .map(([funcao, valor], index) => ({
            value: parseInt(valor || '0'),
            color: colors[index % colors.length],
            text: parseInt(valor || '0') + '%'
        }));

    const renderDot = (color) => (
        <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 10 }} />
    );

    const formatFuncao = (funcao) => {
        // Quebra a string a cada letra maiúscula e coloca espaço
        const formatted = funcao
            .replace(/([A-Z])/g, ' $1') // Adiciona espaço antes de letras maiúsculas
            .trim() // Remove espaços em branco no início e no fim
            .replace(/^./, (str) => str.toUpperCase()); // Capitaliza a primeira letra
    
        return formatted;
    };
    
    const renderLegendComponent = () => (
        <View style={styles.legendContainer}>
            {Object.entries(analysisData.hoje.funcoesMaisUtilizadas).map(([funcao, valor], index) => (
                <View key={funcao} style={styles.legendItem}>
                    {renderDot(colors[index % colors.length])}
                    <View style={styles.legendTextLine}>
                        <Text style={styles.legendText}>{formatFuncao(funcao)}:</Text>
                        <Text style={styles.legendText}>{valor}%</Text>
                    </View>
                </View>
            ))}
        </View>
    );
    

    const utilizacaoDeFuncoesData = [
        {
            value: parseInt(analysisData.hoje.utilizacaoDeFuncoes.funcoesUtilizadas || '0'),
            color: '#177AD5'
        },
        {
            value: parseInt(analysisData.hoje.utilizacaoDeFuncoes.funcoesNaoUtilizadas || '0'),
            color: 'lightgray'
        }
    ];

    const tempoInatividadeData = [
        {
            value: parseInt(analysisData.hoje.tempoInatividade || '0'),
            color: '#177AD5'
        },
        {
            value: 100 - parseInt(analysisData.hoje.tempoInatividade || '0'),
            color: 'lightgray'
        }
    ];

    return (

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {analysisData ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Dashboard</Text>
                    <View style={styles.box}>
                            <Text style={styles.sectionTitle}>Atividades</Text>
                            {renderLegendGraphic1()}
                            <BarChart
                                data={barData}
                                barWidth={90}
                                barBorderWidth={10}
                                barBorderColor={appcolors.branco}
                                spacing={40}
                                hideRules
                                xAxisThickness={0}
                                yAxisThickness={0}
                                noOfSections={3}
                                maxValue={Math.max(
                                    parseInt(analysisData.hoje.atividadesConcluidas || '0'),
                                    parseInt(analysisData.hoje.atividadesInacabadas || '0')
                                )}
                            />
                    </View>


                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Funções Mais Utilizadas Hoje</Text>
                        <PieChart
                            donut
                            showText
                            textColor="black"
                            innerRadius={80}
                            radius={150}
                            textSize={18}
                            showTextBackground
                            textBackgroundRadius={25}
                            data={funcoesMaisUtilizadasData}


                        />
                        {renderLegendComponent()}
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Utilização de Funções</Text>
                        <PieChart
                            donut
                            innerRadius={80}
                            data={utilizacaoDeFuncoesData}
                            centerLabelComponent={() => (
                                <Text style={{ fontSize: 30 }}>
                                    {utilizacaoDeFuncoesData[0].value}%
                                </Text>
                            )}
                        />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Tempo de Inatividade</Text>
                        <PieChart
                            donut
                            innerRadius={80}
                            data={tempoInatividadeData}
                            centerLabelComponent={() => (
                                <Text style={{ fontSize: 30 }}>
                                    {tempoInatividadeData[0].value}%
                                </Text>
                            )}
                        />
                    </View>

                </View>
            ) : (
                <Text>Carregando dados de análise...</Text>
            )}
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        backgroundColor: appcolors.branco,
        elevation: 20,
        shadowRadius: 100,
        shadowOffset: { height: 10, width: 20 },
        shadowOpacity: 20,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        paddingTop: 10,
        marginVertical: 30,
        borderRadius: 40
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
        marginVertical: 30,
    },
    chartContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    legendContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    legendText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 500
    },
    legendTextLine: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '90%'
    }
});