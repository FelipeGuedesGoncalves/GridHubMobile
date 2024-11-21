import { appcolors } from '@/styles/appcolors';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '@/components/Firebase'; // Para acessar o Firebase

export default function DetalhesMicrogrid() {
    const [microgrid, setMicrogrid] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);
    const [locationData, setLocationData] = useState<any>(null);

    // ID da microgrid que você deseja buscar
    const microgridId = "-OCFoYbKSx8KENJLUIuo";

    useEffect(() => {
        // Buscar os dados da microgrid pelo ID
        const microgridRef = firebase.database().ref('microgrids').child(microgridId);
        microgridRef.once('value', (snapshot) => {
            const microgridData = snapshot.val();
            setMicrogrid(microgridData);

            // Quando pegar o userId da microgrid, buscar as informações do locatário
            if (microgridData && microgridData.userId) {
                const userRef = firebase.database().ref('usuario').child(microgridData.userId);
                userRef.once('value', (userSnapshot) => {
                    setUserData(userSnapshot.val());  // Garantir que estamos pegando os dados do locatário
                });
            }

            // Quando pegar o espacoId da microgrid, buscar as informações de localização
            if (microgridData && microgridData.espacoId) {
                const espacoRef = firebase.database().ref('espacos').child(microgridData.espacoId);
                espacoRef.once('value', (espacoSnapshot) => {
                    setLocationData(espacoSnapshot.val());
                });
            }
        });
    }, []); // Executa apenas uma vez quando o componente é montado

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Microgrid</Text>

            <View style={styles.details}>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsTitle}>{microgrid?.nomeMicrogrid || 'N/A'}</Text>
                    <Text style={styles.detailsSubtitle}>Especificidades</Text>
                    <Text style={styles.detailsContent}>Área total necessária: {microgrid?.areaTotal || 'N/A'} m²</Text>
                    <Text style={styles.detailsContent}>Média Anual de Radiação Solar Necessária: {microgrid?.mediaRadiacao || 'N/A'} kWh/m²</Text>
                    <Text style={styles.detailsContent}>Topografia Necessária: {microgrid?.topografia || 'N/A'}</Text>
                    <Text style={styles.detailsContent}>Velocidade média do vento necessária: {microgrid?.velocidadeVento || 'N/A'} m/s </Text>
                </View>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsSubtitle}>Informações do Locatário</Text>
                    <Text style={styles.detailsContent}>Email: {userData?.email || 'Não disponível'}</Text>
                    <Text style={styles.detailsContent}>Nome: {userData?.name || 'Não disponível'}</Text>
                    <Text style={styles.detailsContent}>Telefone: {userData?.telefone || 'Não disponível'}</Text>
                </View>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsSubtitle}>Fontes de energia</Text>
                    <Text style={styles.detailsContent}>{microgrid?.fontesEnergia || 'Não disponível'}</Text>
                </View>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsSubtitle}>Meta de Financiamento</Text>
                    <Text style={styles.detailsContent}>R$ {microgrid?.metaFinanciamento || 'Não disponível'}</Text>
                </View>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsSubtitle}>Localização</Text>
                    <Text style={styles.detailsContent}>{locationData?.endereco || 'Não disponível'}</Text>
                </View>
            </View>
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
        color: appcolors.azulescuro
    },
    details: {},
    infoblock: {},
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: appcolors.azulescuro,
    },
    detailsSubtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: appcolors.azulescuro,
        marginTop: 20,
    },
    detailsContent: {
        fontSize: 14,
        color: appcolors.azulescuro,
    },
});
