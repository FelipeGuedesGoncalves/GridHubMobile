import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { appcolors } from '@/styles/appcolors';
import { firebase } from '@/components/Firebase';
import { globalstyles } from '@/styles/globalstyles';
import CadastroMicrogrid from './CadastroMicrogrids';
import DetalhesMicrogrid from './DetalhesMicrogrid'; // Importando a tela de detalhes
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage

const Stack = createStackNavigator(); // Criando o stack navigator

function MicrogridsDoUsuarioScreen({ navigation }: { navigation: any }) {
  const [microgrids, setMicrogrids] = React.useState([]);
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (!userId) return;

      const microgridRef = firebase.database().ref('microgrids');

      // Carregar os dados ao entrar na tela
      const fetchMicrogrids = async () => {
        const snapshot = await microgridRef
          .orderByChild('userId')
          .equalTo(userId)
          .once('value');
        const fetchedMicrogrids = [];
        snapshot.forEach((child) => {
          fetchedMicrogrids.push({ id: child.key, ...child.val() });
        });
        setMicrogrids(fetchedMicrogrids);
      };

      fetchMicrogrids();

      // Não há necessidade de remover listeners porque estamos usando `.once`
      return () => {};
    }, [userId])
  );

  const handleVerMais = async (microgridId: string) => {
    // Armazenar o microgridId no AsyncStorage
    await AsyncStorage.setItem('microgridSendoExibida', microgridId);
    // Redirecionar para a tela de detalhes
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
        onPress={() => handleVerMais(item.id)} // Chamar a função para armazenar o id e redirecionar
      >
        <Text style={globalstyles.morebuttontext}>Ver Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Microgrids</Text>
      <FlatList
        data={microgrids}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListFooterComponent={
          <TouchableOpacity
            style={globalstyles.addbutton}
            onPress={() => navigation.navigate('CadastroMicrogrid')}
          >
            <Text style={globalstyles.addbuttontext}>Adicionar Microgrid</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

export default function MicrogridsDoUsuario() {
  return (
    <Stack.Navigator initialRouteName="MicrogridsDoUsuarioScreen">
      <Stack.Screen
        name="MicrogridsDoUsuarioScreen"
        component={MicrogridsDoUsuarioScreen}
        options={{
          title: 'Minhas Microgrids',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastroMicrogrid"
        component={CadastroMicrogrid}
        options={{
          title: 'Cadastrar Microgrid',
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
