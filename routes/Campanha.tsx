import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { appcolors } from '@/styles/appcolors';
import { firebase } from '@/components/Firebase';
import { globalstyles } from '@/styles/globalstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetalhesMicrogrid from './DetalhesMicrogrid';

const Stack = createStackNavigator();

function CampanhaScreen({ navigation }: { navigation: any }) {
  const [microgrids, setMicrogrids] = React.useState([]);

  const fetchMicrogrids = React.useCallback(() => {
    const microgridRef = firebase.database().ref('microgrids');

    microgridRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      const uniqueMicrogrids = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setMicrogrids(uniqueMicrogrids);
    });

    return () => microgridRef.off();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchMicrogrids();
    }, [fetchMicrogrids])
  );

  const handleVerMais = async (microgridId: string) => {
    await AsyncStorage.setItem('microgridSendoExibida', microgridId);
    navigation.navigate('DetalhesMicrogrid');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.nomeMicrogrid}</Text>
      <Text style={styles.cardSubtitle}>Produz energia pelas fontes:</Text>
      <Text style={styles.cardContent}>{item.fontesEnergia}</Text>
      <Text style={styles.cardSubtitle}>Área Total:</Text>
      <Text style={styles.cardContent}>{item.areaTotal} m²</Text>
      <Text style={styles.cardSubtitle}>Meta de financiamento:</Text>
      <Text style={styles.cardContent}>R$ {item.metaFinanciamento}</Text>
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
      <Text style={styles.title}>Campanha de Investimentos</Text>
      <Text style={styles.subtitle}>
        Descubra oportunidades incríveis na GridHub e torne-se parte da transformação energética.
        Navegue pelas microgrids cadastrados por usuários como você e encontre projetos que chamem
        sua atenção.
      </Text>
      <FlatList
        data={microgrids}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

export default function Campanha() {
  return (
    <Stack.Navigator initialRouteName="CampanhaScreen">
      <Stack.Screen
        name="CampanhaScreen"
        component={CampanhaScreen}
        options={{
          title: 'Campanha',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetalhesMicrogrid"
        component={DetalhesMicrogrid}
        options={{
          title: 'Detalhes da Microgrid',
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
