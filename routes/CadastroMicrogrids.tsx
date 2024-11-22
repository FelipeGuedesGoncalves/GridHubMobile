import { Button, StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { database, auth } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { globalstyles } from '@/styles/globalstyles';
import Toast from 'react-native-toast-message';
import { appcolors } from '@/styles/appcolors';
import { Picker } from '@react-native-picker/picker';


export default function CadastroMicrogrid({ navigation }) {
    const [userId, setUserId] = useState('');
    const [nomeMicrogrid, setNomeMicrogrid] = useState('');
    const [mediaRadiacao, setMediaRadiacao] = useState('');
    const [topografia, setTopografia] = useState('');
    const [areaTotal, setAreaTotal] = useState('');
    const [velocidadeVento, setVelocidadeVento] = useState('');
    const [fontesEnergia, setFontesEnergia] = useState('');
    const [metaFinanciamento, setMetaFinanciamento] = useState('');
    const [espacos, setEspacos] = useState([]);
    const [espacoSelecionado, setEspacoSelecionado] = useState('');

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
        if (!nomeMicrogrid || !mediaRadiacao || !topografia || !areaTotal || !velocidadeVento || !fontesEnergia || !metaFinanciamento || !espacoSelecionado) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Todos os campos devem ser preenchidos',
            });
            return;
        }
    
        // Garantir que o userId seja sempre o do usuário atual
        const currentUser = auth.currentUser;
        if (!currentUser) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Usuário não autenticado.',
            });
            navigation.goBack();
            return;
        }
    
        const novoMicrogrid = {
            userId: currentUser.uid, // Obter diretamente o userId do currentUser
            nomeMicrogrid,
            mediaRadiacao,
            topografia,
            areaTotal,
            velocidadeVento,
            fontesEnergia,
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
                    <Text style={styles.profileSubtitle}>Estas informações serão exibidas a todos os usuários da plataforma</Text>
                    <Text style={styles.profileLabel}>Nome da Microgrid</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setNomeMicrogrid(text)}
                        autoCapitalize="none"
                    />
                    <Text style={styles.profileLabel}>Média Anual de Radiação Solar Necessária</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setMediaRadiacao(text)}
                        autoCapitalize="none"
                    />
                    <Text style={styles.profileLabel}>Topografia Necessária</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setTopografia(text)}
                        autoCapitalize="none"
                    />
                    <Text style={styles.profileLabel}>Área Total Necessária</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setAreaTotal(text)}
                        autoCapitalize="none"
                    />
                    <Text style={styles.profileLabel}>Velocidade Média do Vento Necessária</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setVelocidadeVento(text)}
                        autoCapitalize="none"
                    />
                    <Text style={styles.profileTitle}>Fontes de Energia</Text>
                    <Text style={styles.profileSubtitle}>Indique por quais fontes de energia a Microgrid é composta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setFontesEnergia(text)}
                        autoCapitalize="none"
                    />
                    <Text style={styles.profileTitle}>Meta de financiamento</Text>
                    <Text style={styles.profileSubtitle}>Insira aqui uma meta de financiam,ento para que investidores interessados possam ofertar para pagar uma parcela dela</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setMetaFinanciamento(text)}
                        autoCapitalize="none"
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
        marginTop: 20,
        color: appcolors.azulescuro
    },
    profileSubtitle: {
        marginBottom: 20,
        color: appcolors.azulescuro
    },
    profileLabel: {
        marginTop: 16,
        fontWeight: 'bold',
        color: appcolors.azulescuro
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
        borderColor: appcolors.azulescuro,
        color: appcolors.azulescuro,
    },
});
