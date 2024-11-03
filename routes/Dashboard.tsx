import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { dadosIniciaisAnalise } from '@/models/dadosIniciaisAnalise';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { appcolors } from '@/styles/appcolors';
import { DashboardData } from '@/models/DashboardData.interface';

export default function Dashboard() {
    const [analysisData, setAnalysisData] = useState<DashboardData>(dadosIniciaisAnalise);
    const [selectedPeriod, setSelectedPeriod] = useState<'hoje' | 'estaSemana' | 'esteMes'>('hoje'); // Estado para controlar o período selecionado

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

    const barData = [
        {
            value: parseInt(analysisData[selectedPeriod].atividadesConcluidas || '0'),
            label: 'Concluídas',
            frontColor: appcolors.roxo,
            spacing: 2,
        },
        {
            value: parseInt(analysisData[selectedPeriod].atividadesInacabadas || '0'),
            label: 'Inacabadas',
            frontColor: appcolors.roxoclaro,
            spacing: 20,
        },
    ];

    const renderLegendGraphic1 = () => {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 16 }}>
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

    const funcoesMaisUtilizadasArray = Object.entries(analysisData[selectedPeriod].funcoesMaisUtilizadas)
        .sort(([, valorA], [, valorB]) => parseInt(valorB || '0') - parseInt(valorA || '0'))
        .slice(0, 5);

    const funcoesMaisUtilizadasData = funcoesMaisUtilizadasArray.map(([funcao, valor], index) => ({
        value: parseInt(valor || '0'),
        color: colors[index % colors.length],
        text: parseInt(valor || '0') + '%'
    }));

    const somaOutrasFuncoes = Object.values(analysisData[selectedPeriod].funcoesMaisUtilizadas)
        .reduce((acc, valor) => acc + parseInt(valor || '0'), 0) - funcoesMaisUtilizadasData.reduce((acc, { value }) => acc + value, 0);

    if (somaOutrasFuncoes > 0) {
        funcoesMaisUtilizadasData.push({
            value: somaOutrasFuncoes,
            color: 'lightgray',
            text: somaOutrasFuncoes + '%',
        });
    }

    const renderDot = (color) => (
        <View style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: color, marginRight: 10 }} />
    );

    const formatFuncao = (funcao) => {
        const formatted = funcao
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/^./, (str) => str.toUpperCase());

        return formatted;
    };

    const utilizacaoDeFuncoesData = [
        {
            value: parseInt(analysisData[selectedPeriod].utilizacaoDeFuncoes.funcoesUtilizadas || '0'),
            color: '#0084ff',
            focused: true
        },
        {
            value: parseInt(analysisData[selectedPeriod].utilizacaoDeFuncoes.funcoesNaoUtilizadas || '0'),
            color: 'lightgray'
        }
    ];

    const tempoInatividadeData = [
        {
            value: parseInt(analysisData[selectedPeriod].tempoInatividade || '0'),
            color: '#e21a1a'
        },
        {
            value: 100 - parseInt(analysisData[selectedPeriod].tempoInatividade || '0'),
            color: 'lightgray'
        }
    ];

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {analysisData ? (
                <View style={styles.container}>
                    <Text style={styles.title}>Dashboard</Text>
                    {/* Botões para selecionar o período */}
                    <View style={{ flexDirection: 'row', marginVertical: 16 }}>
                        {['hoje', 'estaSemana', 'esteMes'].map((period) => (
                            <TouchableOpacity
                                key={period}
                                onPress={() => setSelectedPeriod(period as 'hoje' | 'estaSemana' | 'esteMes')}
                                style={{
                                    backgroundColor: selectedPeriod === period ? appcolors.roxo : appcolors.roxoleve,
                                    padding: 10,
                                    borderRadius: 20,
                                    marginHorizontal: 5,
                                }}
                            >
                                <Text style={{ color: appcolors.branco }}>{period === 'hoje' ? 'Hoje' : period === 'estaSemana' ? 'Esta Semana' : 'Este Mês'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

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
                                parseInt(analysisData[selectedPeriod].atividadesConcluidas || '0'),
                                parseInt(analysisData[selectedPeriod].atividadesInacabadas || '0')
                            )}
                        />
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Funções Mais Utilizadas Hoje</Text>
                        <PieChart
                            donut
                            showText
                            textColor="black"
                            innerRadius={60}
                            radius={130}
                            textSize={18}
                            showTextBackground
                            textBackgroundRadius={25}
                            data={funcoesMaisUtilizadasData}
                        />

                        <View style={styles.legendContainer}>
                            {funcoesMaisUtilizadasArray.map(([funcao, valor], index) => (
                                <View key={funcao} style={styles.legendItem}>
                                    {renderDot(colors[index % colors.length])}
                                    <View style={styles.legendTextLine}>
                                        <Text style={styles.legendText}>{formatFuncao(funcao)}:</Text>
                                        <Text style={styles.legendText}>{valor}%</Text>
                                    </View>
                                </View>
                            ))}
                            {somaOutrasFuncoes > 0 && (
                                <View style={styles.legendItem}>
                                    {renderDot('lightgray')}
                                    <View style={styles.legendTextLine}>
                                        <Text style={styles.legendText}>Outras:</Text>
                                        <Text style={styles.legendText}>{somaOutrasFuncoes}%</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Funções Utilizadas</Text>
                        <PieChart
                            donut
                            radius={120}
                            sectionAutoFocus
                            innerRadius={80}
                            data={utilizacaoDeFuncoesData}
                            centerLabelComponent={() => (
                                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                    {utilizacaoDeFuncoesData[0].value}%
                                </Text>
                            )}
                        />
                        <View style={styles.legendContainer}>
                            <View style={styles.legendTextLine}>
                                <Text style={styles.legendText}>{renderDot('#0084ff')}  Funções Utilizadas:</Text>
                                <Text style={styles.legendText}> {utilizacaoDeFuncoesData[0].value}%</Text>
                            </View>

                            <View style={styles.legendTextLine}>
                                <Text style={styles.legendText}>{renderDot('lightgray')}  Funções Não Utilizadas:</Text>
                                <Text style={styles.legendText}> {utilizacaoDeFuncoesData[1].value}%</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>Tempo de Inatividade</Text>
                        <PieChart
                            donut
                            radius={120}
                            sectionAutoFocus
                            innerRadius={80}
                            data={tempoInatividadeData}
                            centerLabelComponent={() => (
                                <Text style={{ fontSize: 40, fontWeight: 'bold' }}>
                                    {tempoInatividadeData[0].value}%
                                </Text>
                            )}
                        />
                        <View style={styles.legendContainer}>
                            <View style={styles.legendTextLine}>
                                <Text style={styles.legendText}>{renderDot('#e21a1a')}  Tempo de Inatividade:</Text>
                                <Text style={styles.legendText}> {tempoInatividadeData[0].value}%</Text>
                            </View>

                            <View style={styles.legendTextLine}>
                                <Text style={styles.legendText}>{renderDot('lightgray')}  Tempo Ativo:</Text>
                                <Text style={styles.legendText}> {tempoInatividadeData[1].value}%</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <Text style={styles.loadingText}>Carregando dados...</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: appcolors.branco,
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    box: {
        backgroundColor: appcolors.roxoleve,
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    legendContainer: {
        flexDirection: 'column',
        marginTop: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    legendTextLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendText: {
        fontSize: 14,
        marginLeft: 4,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
});
