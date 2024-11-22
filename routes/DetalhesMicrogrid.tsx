import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@/components/Firebase';
import { appcolors } from '@/styles/appcolors';
import { useNavigation } from '@react-navigation/native';

export default function DetalhesMicrogrid() {
  const [microgrid, setMicrogrid] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isDifferentOwner, setIsDifferentOwner] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setCurrentUserId(user.uid);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const microgridId = await AsyncStorage.getItem('microgridSendoExibida');

      if (microgridId) {
        const microgridRef = firebase.database().ref('microgrids').child(microgridId);
        microgridRef.once('value', (snapshot) => {
          const microgridData = snapshot.val();
          setMicrogrid(microgridData);

          if (microgridData && microgridData.userId && currentUserId) {
            setIsDifferentOwner(microgridData.userId !== currentUserId);
          }

          if (microgridData && microgridData.userId) {
            const userRef = firebase.database().ref('usuario').child(microgridData.userId);
            userRef.once('value', (userSnapshot) => {
              setUserData(userSnapshot.val());
            });
          }

          if (microgridData && microgridData.espacoId) {
            const espacoRef = firebase.database().ref('espacos').child(microgridData.espacoId);
            espacoRef.once('value', (espacoSnapshot) => {
              setLocationData(espacoSnapshot.val());
            });
          }
        });
      }
    };

    fetchData();
  }, [currentUserId]);

  const handleDeleteMicrogrid = async () => {
    try {
      const microgridId = await AsyncStorage.getItem('microgridSendoExibida');
  
      if (microgridId) {
        const microgridRef = firebase.database().ref('microgrids').child(microgridId);
        await microgridRef.remove();
  
        Alert.alert("Sucesso", "Microgrid deletada com sucesso!");
        navigation.goBack(); // Volta para a tela anterior
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar a microgrid.");
    }
  };
  

  const confirmDelete = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar esta microgrid? Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Deletar', style: 'destructive', onPress: handleDeleteMicrogrid },
      ]
    );
  };

  const handleConfirm = () => {
    Alert.alert(
      "Email enviado",
      "Um email foi enviado para o dono desta microgrid demonstrando interesse de contato. Fique atento à possível resposta.",
      [{ text: "OK" }]
    );
  };

  const handleSendEmail = () => {
    Alert.alert(
      "Confirmação",
      "Deseja enviar um email automático para o dono desta microgrid oferecendo um investimento parcial ou total em relação à meta de financiamento?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: handleConfirm }
      ]
    );
  };

  return (
    <ScrollView style={styles.scrowView}>
      <View style={styles.container}>
        <Text style={styles.title}>{microgrid?.nomeMicrogrid || 'N/A'}</Text>

        <View style={styles.details}>
          <View style={styles.infoblock}>
            <Text style={styles.detailsSubtitle}>Especificidades</Text>
            <Text style={styles.detailsContent}>Área total necessária: {microgrid?.areaTotal || 'N/A'} m²</Text>
            <Text style={styles.detailsContent}>Média Anual de Radiação Solar Necessária: {microgrid?.mediaRadiacao || 'N/A'} kWh/m²</Text>
            <Text style={styles.detailsContent}>Topografia Necessária: {microgrid?.topografia || 'N/A'}</Text>
            <Text style={styles.detailsContent}>Velocidade média do vento necessária: {microgrid?.velocidadeVento || 'N/A'} m/s</Text>
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

          {isDifferentOwner ? (
            <View style={styles.buttonContainer}>
              <Button title="Torne-se um Investidor" onPress={handleSendEmail} color={appcolors.azulescuro} />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <Button title="Deletar Microgrid" onPress={confirmDelete} color="red" />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrowView: {
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
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
