import { Button, StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import { database, auth } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { globalstyles } from '@/styles/globalstyles';
import Toast from 'react-native-toast-message';
import { appcolors } from '@/styles/appcolors';
import {Picker} from '@react-native-picker/picker';


export default function CadastroMicrogrid({ navigation }) {
    const [userId, setUserId] = useState('');
    const [nomeMicrogrid, setNomeMicrogrid] = useState('');
    const [mediaRadiacao, setMediaRadiacao] = useState('');
    const [topografia, setTopografia] = useState('');
    const [areaTotal, setAreaTotal] = useState('');
    const [velocidadeVento, setVelocidadeVento] = useState('');
    const [fontesEnergia, setFontesEnergia] = useState('');
    const [apiRelatorio, setApiRelatorio] = useState('');
    const [metaFinanciamento, setMetaFinanciamento] = useState('');
    const [espacos, setEspacos] = useState([]);
    const [espacoSelecionado, setEspacoSelecionado] = useState('');

    // Obtem o userId do usuário logado
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUserId(currentUser.uid);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Usuário não autenticado.',
            });
            navigation.goBack();
        }

        // Carregar todos os espaços cadastrados
        database.ref('espacos').once('value', snapshot => {
            const espacosData = [];
            snapshot.forEach(childSnapshot => {
                const espaco = childSnapshot.val();
                espacosData.push({ id: childSnapshot.key, nome: espaco.nomeEspaco });
            });
            setEspacos(espacosData);
        });
    }, []);

    async function saveMicrogrid() {
        if (!nomeMicrogrid || !mediaRadiacao || !topografia || !areaTotal || !velocidadeVento || !fontesEnergia || !apiRelatorio || !metaFinanciamento || !espacoSelecionado) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Todos os campos devem ser preenchidos',
            });
            return;
        }

        const novoMicrogrid = {
            userId,
            nomeMicrogrid,
            mediaRadiacao,
            topografia,
            areaTotal,
            velocidadeVento,
            fontesEnergia,
            apiRelatorio,
            metaFinanciamento,
            espacoId: espacoSelecionado,
        };

        database
            .ref('microgrids')
            .push(novoMicrogrid)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Microgrid cadastrada com sucesso.',
                });
                navigation.goBack();
            })
            .catch((error) => {
                console.log('Erro ao salvar microgrid no banco de dados:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: 'Não foi possível cadastrar a microgrid.',
                });
            });
    }

    return (
        <LinearGradient colors={[appcolors.azulescuro, appcolors.azul]} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Cadastrar Microgrid</Text>
                <View style={styles.whiteBlock}>
                    <Text style={styles.profileTitle}>Informações da Microgrid</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da Microgrid"
                        onChangeText={(text) => setNomeMicrogrid(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Média Anual de Radiação Solar Necessária"
                        keyboardType="numeric"
                        onChangeText={(text) => setMediaRadiacao(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Topografia Necessária"
                        onChangeText={(text) => setTopografia(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Área Total Necessária"
                        keyboardType="numeric"
                        onChangeText={(text) => setAreaTotal(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Velocidade Média do Vento Necessária"
                        keyboardType="numeric"
                        onChangeText={(text) => setVelocidadeVento(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Fontes de Energia"
                        onChangeText={(text) => setFontesEnergia(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="API de Exibição de Relatórios"
                        onChangeText={(text) => setApiRelatorio(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Meta de Financiamento"
                        keyboardType="numeric"
                        onChangeText={(text) => setMetaFinanciamento(text)}
                    />
                    <Text style={styles.profileLabel}>Escolha o Espaço</Text>
                    <Picker
                        selectedValue={espacoSelecionado}
                        onValueChange={(itemValue) => setEspacoSelecionado(itemValue)}
                    >
                        <Picker.Item label="Selecione um espaço" value="" />
                        {espacos.map((espaco) => (
                            <Picker.Item key={espaco.id} label={espaco.nome} value={espaco.id} />
                        ))}
                    </Picker>
                </View>
                <TouchableOpacity onPress={() => saveMicrogrid()} style={globalstyles.button}>
                    <Text style={globalstyles.buttontext}>Salvar Microgrid</Text>
                </TouchableOpacity>
            </ScrollView>
            <Toast />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
        marginTop: 40,
    },
    title: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    whiteBlock: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 20,
    },
    profileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: appcolors.azulescuro,
    },
    profileLabel: {
        marginTop: 16,
        fontWeight: 'bold',
        color: appcolors.azulescuro,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
        borderColor: appcolors.azulescuro,
        color: appcolors.azulescuro,
    },
});
