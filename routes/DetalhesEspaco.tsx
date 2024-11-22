import { appcolors } from '@/styles/appcolors';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';
import { firebase } from '@/components/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DetalhesEspaco() {
  const [espaco, setEspaco] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigation = useNavigation();
  const [isDifferentOwner, setIsDifferentOwner] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const espacoId = await AsyncStorage.getItem('espacoSendoExibido');

        if (!espacoId) return;

        const espacoRef = firebase.database().ref('espacos').child(espacoId);
        const snapshot = await espacoRef.once('value');
        const espacoData = snapshot.val();
        setEspaco(espacoData);

        if (espacoData?.userId) {
          const userRef = firebase.database().ref('usuario').child(espacoData.userId);
          const userSnapshot = await userRef.once('value');
          setUserData(userSnapshot.val());
          
          // Verifica se o usuário atual é o proprietário do espaço
          setIsDifferentOwner(espacoData.userId !== firebase.auth().currentUser?.uid);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do espaço.');
      }
    };

    fetchData();
  }, []);

  const handleConfirm = () => {
    Alert.alert(
      "Email enviado",
      "Um email foi enviado para o dono deste espaço demonstrando interesse de contato. Fique atento à possível resposta.",
      [{ text: "OK" }]
    );
  };

  const handleSendEmail = () => {
    Alert.alert(
      "Confirmação",
      "Deseja enviar um email automático para o dono deste espaço querendo alocar sua microgrid em seu local?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: handleConfirm }
      ]
    );
  };

  const handleDeleteEspaco = async () => {
    try {
      const espacoId = await AsyncStorage.getItem('espacoSendoExibido');

      if (!espacoId) {
        Alert.alert('Erro', 'Espaço não encontrado.');
        return;
      }

      const espacoRef = firebase.database().ref('espacos').child(espacoId);
      const snapshot = await espacoRef.once('value');
      const espacoData = snapshot.val();

      if (espacoData?.userId !== firebase.auth().currentUser?.uid) {
        Alert.alert('Acesso Negado', 'Você não tem permissão para deletar este espaço.');
        return;
      }

      Alert.alert(
        'Confirmar exclusão',
        'Tem certeza de que deseja deletar este espaço? Esta ação não pode ser desfeita.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Deletar',
            style: 'destructive',
            onPress: async () => {
              await espacoRef.remove();
              Alert.alert('Sucesso', 'Espaço deletado com sucesso!');
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o espaço.');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>{espaco?.nomeEspaco || 'N/A'}</Text>

        <View style={styles.details}>
          <View style={styles.infoBlock}>
            <Text style={styles.detailsSubtitle}>Especificidades</Text>
            <Text style={styles.detailsContent}>Área total: {espaco?.areaTotal || 'N/A'}m²</Text>
            <Text style={styles.detailsContent}>Orientação Solar: {espaco?.orientacaoSolar || 'N/A'}</Text>
            <Text style={styles.detailsContent}>
              Média Anual de Radiação Solar: {espaco?.mediaRadiacao || 'N/A'}kWh/m²
            </Text>
            <Text style={styles.detailsContent}>Topografia: {espaco?.topografia || 'N/A'}</Text>
            <Text style={styles.detailsContent}>
              Velocidade média do vento da região: {espaco?.velocidadeVento || 'N/A'}m/s
            </Text>
            <Text style={styles.detailsContent}>Endereço: {espaco?.endereco || 'N/A'}</Text>
            <Text style={styles.detailsContent}>
              Suporte para as energias: {espaco?.fontesEnergia || 'N/A'}
            </Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.detailsSubtitle}>Informações do Locador</Text>
            <Text style={styles.detailsContent}>Email: {userData?.email || 'Não disponível'}</Text>
            <Text style={styles.detailsContent}>Nome: {userData?.name || 'Não disponível'}</Text>
            <Text style={styles.detailsContent}>Telefone: {userData?.telefone || 'Não disponível'}</Text>
          </View>
        </View>

        {isDifferentOwner ? (
          <View style={styles.buttonContainer}>
            <Button title="Aloque sua Microgrid" onPress={handleSendEmail} color={appcolors.azulescuro} />
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button title="Deletar Espaço" onPress={handleDeleteEspaco} color="red" />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
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
  infoBlock: {},
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
