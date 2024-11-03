import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { relatorioInicialAnalise } from '@/models/relatorioInicialAnalise';
import { appcolors } from '@/styles/appcolors';
import { oopsMessage } from '@/models/oopsmessage';

export default function Relatorio() {
    const [relatorioData, setRelatorioData] = useState(relatorioInicialAnalise);
    const [selectedPeriod, setSelectedPeriod] = useState<'hoje' | 'estaSemana' | 'esteMes'>('hoje');

    useEffect(() => {
        const fetchRelatorioData = async () => {
            const user = auth.currentUser;
            if (user) {
                const relatorioRef = database.ref(`relatorios/${user.uid}`);
                relatorioRef.on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        setRelatorioData(snapshot.val());
                    } else {
                        console.log('No report data available');
                    }
                });
            }
        };

        fetchRelatorioData();
    }, []);

    const renderRelatorio = () => {
        const textoRelatorio = relatorioData[selectedPeriod]?.relatorio || '';

        // Exibir oopsMessage caso o relatório esteja vazio para o período selecionado
        return (
            <Text>
                {textoRelatorio.trim() === '' ? oopsMessage() : textoRelatorio}
            </Text>
        );
    };

    return (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Relatório</Text>
                
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
                            <Text style={{ color: appcolors.branco }}>
                                {period === 'hoje' ? 'Hoje' : period === 'estaSemana' ? 'Esta Semana' : 'Este Mês'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
    
                {relatorioData[selectedPeriod]?.relatorio?.trim() === '' ? (
                    // Exibe o `oopsMessage` no lugar do `box`
                    <View>
                    {typeof oopsMessage === 'function' ? oopsMessage() : oopsMessage}
                </View>
                ) : (
                    // Exibe o `box` com o relatório se houver dados
                    <View style={styles.box}>
                        <Text style={styles.sectionTitle}>
                            Relatório de{selectedPeriod === 'hoje' ? ' Hoje' : selectedPeriod === 'estaSemana' ? 'sta Semana' : 'ste Mês'}
                        </Text>
                        {renderRelatorio()}
                    </View>
                )}
            </View>
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
        height: '100%',
    },
    box: {
        backgroundColor: appcolors.branco,
        elevation: 20,
        shadowRadius: 100,
        shadowOffset: { height: 10, width: 20 },
        shadowOpacity: 20,
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        paddingTop: 10,
        marginVertical: 30,
        borderRadius: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        color: '#9249FF',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 30,
    }
});
