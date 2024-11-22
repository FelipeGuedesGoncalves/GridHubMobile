import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { firebase } from '@/components/Firebase';
import { appcolors } from '@/styles/appcolors';
import { globalstyles } from '@/styles/globalstyles';
import CadastroEspaco from './CadastroEspaco';
import DetalhesEspaco from './DetalhesEspaco';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function EspacosDoUsuarioScreen({ navigation }: { navigation: any }) {
  const [espacos, setEspacos] = React.useState([]);
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const fetchEspacosDoUsuario = React.useCallback(() => {
    if (!userId) return;

    const espacoRef = firebase.database().ref('espacos');

    espacoRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      const userEspacos = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((espaco) => espaco.userId === userId);

      setEspacos(userEspacos);
    });

    return () => espacoRef.off();
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchEspacosDoUsuario();
    }, [fetchEspacosDoUsuario])
  );

  const handleVerMais = async (espacoId: string) => {
    await AsyncStorage.setItem('espacoSendoExibido', espacoId);
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
      <Text style={styles.title}>Meus Espaços</Text>
      <FlatList
        data={espacos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        ListFooterComponent={
          <TouchableOpacity
            style={globalstyles.addbutton}
            onPress={() => navigation.navigate('CadastroEspaco')}
          >
            <Text style={globalstyles.addbuttontext}>Adicionar Espaço</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

export default function EspacosDoUsuario() {
  return (
    <Stack.Navigator initialRouteName="EspacosDoUsuarioScreen">
      <Stack.Screen
        name="EspacosDoUsuarioScreen"
        component={EspacosDoUsuarioScreen}
        options={{
          title: 'Meus Espaços',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CadastroEspaco"
        component={CadastroEspaco}
        options={{
          title: 'Cadastro de Espaço',
          headerShown: false,
        }}
      />
            <Stack.Screen
        name="DetalhesEspaco"
        component={DetalhesEspaco}
        options={{
          title: 'Cadastro de Espaço',
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
