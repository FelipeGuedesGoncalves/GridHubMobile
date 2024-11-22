import { appcolors } from '@/styles/appcolors';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '@/components/Firebase';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetalhesEspaco() {
  const [espaco, setespaco] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const espacoId = await AsyncStorage.getItem('espacoSendoExibido');

      if (espacoId) {
        const espacoRef = firebase.database().ref('espacos').child(espacoId);
        espacoRef.once('value', (snapshot) => {
          const espacoData = snapshot.val();
          setespaco(espacoData);

          if (espacoData && espacoData.userId) {
            const userRef = firebase.database().ref('usuario').child(espacoData.userId);
            userRef.once('value', (userSnapshot) => {
              setUserData(userSnapshot.val());
            });
          }

          if (espacoData && espacoData.espacoId) {
            const espacoRef = firebase.database().ref('espacos').child(espacoData.espacoId);
            espacoRef.once('value', (espacoSnapshot) => {
              setLocationData(espacoSnapshot.val());
            });
          }
        });
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.scrowView}>
        <View style={styles.container}>
            <Text style={styles.title}>{espaco?.nomeEspaco || 'N/A'}</Text>

            <View style={styles.details}>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsSubtitle}>Especificidades</Text>
                    <Text style={styles.detailsContent}>Área total: {espaco?.areaTotal || 'N/A'}m²</Text>
                    <Text style={styles.detailsContent}>Orientação Solar: {espaco?.orientacaoSolar || 'N/A'}</Text>
                    <Text style={styles.detailsContent}>Média Anual de Radiação Solar: {espaco?.mediaRadiacao || 'N/A'}kWh/m²</Text>
                    <Text style={styles.detailsContent}>Topografia: {espaco?.topografia || 'N/A'}</Text>
                    <Text style={styles.detailsContent}>Velocidade média do vento da região: {espaco?.velocidadeVento || 'N/A'}m/s </Text>
                    <Text style={styles.detailsContent}>Endereço: {espaco?.endereco || 'N/A'} m²</Text>
                    <Text style={styles.detailsContent}>Suporte para as energias: {espaco?.fontesEnergia || 'N/A'}</Text>
                </View>
                <View style={styles.infoblock}>
                    <Text style={styles.detailsSubtitle}>Informações do Locador</Text>
                    <Text style={styles.detailsContent}>Email: {userData?.email || 'Não disponível'}</Text>
                    <Text style={styles.detailsContent}>Nome: {userData?.name || 'Não disponível'}</Text>
                    <Text style={styles.detailsContent}>Telefone: {userData?.telefone || 'Não disponível'}</Text>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrowView:{
        backgroundColor: '#FFFFFF',
      },
    container: {
        flex: 1,
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
    details: {
        width: '80%',
        marginTop: 10,
        marginBottom: 40,
    },
    infoblock: {},
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: appcolors.azulescuro,
        textAlign: 'center',
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
        marginVertical: 5,
    },
});

