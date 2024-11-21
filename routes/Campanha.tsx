import { appcolors } from '@/styles/appcolors';
import { globalstyles } from '@/styles/globalstyles';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '@/components/Firebase'; // Ajuste o caminho para o seu firebase

export default function Campanha() {
  const [microgrids, setMicrogrids] = useState([]);
  const [espacos, setEspacos] = useState({}); // Usaremos um objeto para armazenar os dados dos espaços

  useEffect(() => {
    // Carregar as microgrids em tempo real
    const microgridRef = firebase.database().ref('microgrids');
    const espacoRef = firebase.database().ref('espacos');

    // Escutando as microgrids em tempo real
    microgridRef.on('value', (microgridSnapshot) => {
      const microgridsData = [];
      microgridSnapshot.forEach((childSnapshot) => {
        microgridsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      setMicrogrids(microgridsData); // Atualizando as microgrids
    });

    // Escutando os espaços em tempo real
    espacoRef.on('value', (espacoSnapshot) => {
      const espacosData = {};
      espacoSnapshot.forEach((childSnapshot) => {
        espacosData[childSnapshot.key] = childSnapshot.val().nomeEspaco;
      });
      setEspacos(espacosData); // Atualizando os espaços
    });

    // Limpeza ao desmontar o componente
    return () => {
      microgridRef.off();
      espacoRef.off();
    };
  }, []);

  const renderItem = ({ item }) => {
    const nomeEspaco = espacos[item.espacoId] || 'Espaço não encontrado';

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.nomeMicrogrid}</Text>
        <Text style={styles.cardSubtitle}>Produz energia pelas fontes:</Text>
        <Text style={styles.cardContent}>{item.fontesEnergia}</Text>
        <Text style={styles.cardSubtitle}>Localizado no espaço:</Text>
        <Text style={styles.cardContent}>{nomeEspaco}</Text>
        <TouchableOpacity style={globalstyles.morebutton}>
          <Text style={globalstyles.morebuttontext}>Ver Mais</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campanha de Investimento</Text>
      <Text style={styles.subtitle}>
        Descubra oportunidades incríveis na GridHub e torne-se parte da transformação energética.
        Navegue pelos microgrids cadastrados por usuários como você e encontre projetos que chamem
        sua atenção.
      </Text>
      <FlatList
        data={microgrids}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatList}
        initialNumToRender={10} // Defina o número inicial de renderizações
        onEndReached={() => {
          // Aqui, você pode adicionar lógica para carregar mais itens se necessário
        }}
        onEndReachedThreshold={0.5} // Defina o limite para o carregamento adicional
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fffff00',
    alignItems: 'center',
    paddingTop: 20,
    padding: 0
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
    margin: 20
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
    paddingBottom: 50,
  },
});
