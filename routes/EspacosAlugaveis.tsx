import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { appcolors } from '@/styles/appcolors';
import { firebase } from '@/components/Firebase';
import { globalstyles } from '@/styles/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetalhesEspaco from './DetalhesEspaco';

const Stack = createStackNavigator();

function EspacoScreen({ navigation }: { navigation: any }) {
  const [espacos, setEspacos] = React.useState([]);

  const fetchEspacos = React.useCallback(() => {
    const espacoRef = firebase.database().ref('espacos');

    espacoRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      const uniqueEspacos = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setEspacos(uniqueEspacos);
    });

    // Garantindo que nenhum listener fique ativo
    return () => espacoRef.off();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Atualiza os espaços toda vez que a tela ganha foco
      fetchEspacos();
    }, [fetchEspacos])
  );

  const handleVerMais = async (espacoId: string) => {
    // Armazenar o espacoId no AsyncStorage
    await AsyncStorage.setItem('espacoSendoExibido', espacoId);
    // Redirecionar para a tela de detalhes
    navigation.navigate('DetalhesEspaco');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nomeEspaco}</Text>
      <Text style={styles.cardSubtitle}>Endereço:</Text>
      <Text style={styles.cardContent}>{item.endereco}</Text>
      <Text style={styles.cardSubtitle}>Área Total:</Text>
      <Text style={styles.cardContent}>{item.areaTotal} m²</Text>
      <TouchableOpacity
        style={globalstyles.morebutton}
        onPress={() => handleVerMais(item.id)}
      >
        <Text style={globalstyles.morebuttontext}>Ver Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Espaços Alugáveis</Text>
      <Text style={styles.subtitle}>
        Encontre espaços ideais para geração de energia renovável. Explore e veja detalhes dos
        espaços cadastrados.
      </Text>
      <FlatList
        data={espacos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

export default function EspacosAlugaveis() {
  return (
    <Stack.Navigator initialRouteName="EspacoScreen">
      <Stack.Screen
        name="EspacoScreen"
        component={EspacoScreen}
        options={{
          title: 'Espaços',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetalhesEspaco"
        component={DetalhesEspaco}
        options={{
          title: 'Detalhes do Espaço',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
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
  subtitle: {
    fontSize: 11,
    paddingHorizontal: 30,
    color: appcolors.azulescuro,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: appcolors.branco,
    width: '90%',
    elevation: 20,
    shadowRadius: 100,
    shadowOffset: { height: 10, width: 20 },
    shadowOpacity: 10,
    borderRadius: 30,
    padding: 20,
    margin: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appcolors.azulescuro,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: appcolors.azulescuro,
    marginTop: 20,
  },
  cardContent: {
    fontSize: 14,
    color: appcolors.azulescuro,
  },
  flatList: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
});
