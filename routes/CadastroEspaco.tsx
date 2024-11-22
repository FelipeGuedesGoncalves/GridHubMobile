import { Button, StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { database, auth } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { globalstyles } from '@/styles/globalstyles';
import Toast from 'react-native-toast-message';
import { appcolors } from '@/styles/appcolors';
import { checkCep } from '@/client/client';

export default function CadastroEspaco({ navigation }) {
    const [userId, setUserId] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [isAddressLocked, setIsAddressLocked] = useState(false);
    const [fontesEnergia, setFontesEnergia] = useState('');
    const [nomeEspaco, setNomeEspaco] = useState('');
    const [orientacaoSolar, setOrientacaoSolar] = useState('');
    const [mediaRadiacao, setMediaRadiacao] = useState('');
    const [topografia, setTopografia] = useState('');
    const [areaTotal, setAreaTotal] = useState('');
    const [direcaoVento, setDirecaoVento] = useState('');
    const [velocidadeVento, setVelocidadeVento] = useState('');

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
    }, []);


    async function handleCepChange(inputCep) {
        setCep(inputCep);


        if (inputCep.length === 8) {
            const response = await checkCep(inputCep);

            if (response && !response.erro) {
                setRua(response.logradouro);
                setCidade(response.localidade);
                setEstado(response.uf);
                setIsAddressLocked(true);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'CEP inválido ou não encontrado.',
                });
                resetAddressFields();
            }
        }
    }


    function resetAddressFields() {
        setRua('');
        setCidade('');
        setEstado('');
        setIsAddressLocked(false);
    }

    async function saveEspaco() {
        if (!cep || !rua || !numero || !cidade || !estado || !fontesEnergia || !nomeEspaco || !orientacaoSolar || !mediaRadiacao || !topografia || !areaTotal || !direcaoVento || !velocidadeVento) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Todos os campos devem ser preenchidos',
            });
            navigation.navigate('EspacosDoUsuario')
            return;
        }

        const endereco = `${rua}, ${numero} - ${cidade}, ${estado}, CEP: ${cep}`;

        const novoEspaco = {
            userId,
            endereco,
            fontesEnergia,
            nomeEspaco,
            orientacaoSolar,
            mediaRadiacao,
            topografia,
            areaTotal,
            direcaoVento,
            velocidadeVento,
        };

        database
            .ref('espacos')
            .push(novoEspaco)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Sucesso!',
                    text2: 'Espaço cadastrado com sucesso.',
                });
                navigation.goBack();
            })
            .catch((error) => {
                console.log('Erro ao salvar espaço no banco de dados:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: 'Não foi possível cadastrar o espaço.',
                });
            });
    }

    return (
        <LinearGradient colors={[appcolors.azulescuro, appcolors.azul]} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Cadastrar Espaço</Text>
                <View style={styles.whiteBlock}>
                <Text style={styles.profileTitle}>Endereço</Text>
                <Text style={styles.profileSubtitle}>O CEP preenche automaticamente todos os campos com exceção do número, para redefinir o endereço, altere o CEP</Text>
                    <Text style={styles.profileLabel}>CEP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        maxLength={8}
                        value={cep}
                        onChangeText={(text) => handleCepChange(text)}
                    />
                    <Text style={styles.profileLabel}>Rua</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        value={rua}
                        editable={!isAddressLocked}
                    />
                    <Text style={styles.profileLabel}>Número</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        value={numero}
                        onChangeText={(text) => setNumero(text)}
                    />
                    <Text style={styles.profileLabel}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        value={cidade}
                        editable={!isAddressLocked}
                    />
                    <Text style={styles.profileLabel}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        value={estado}
                        maxLength={2}
                        editable={!isAddressLocked}
                    />
                    <Text style={styles.profileTitle}>Fontes de Energia</Text>
                    <Text style={styles.profileSubtitle}>Preencha com as fontes de energia que o espaço tem preparação para receber</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setFontesEnergia(text)}
                    />
                    <Text style={styles.profileTitle}>Sobre o Espaço</Text>
                    <Text style={styles.profileSubtitle}>Preencha com informações sobre o Espaço</Text>
                    <Text style={styles.profileLabel}>Nome do Espaço</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setNomeEspaco(text)}
                    />
                    <Text style={styles.profileLabel}>Orientação Solar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setOrientacaoSolar(text)}
                    />
                    <Text style={styles.profileLabel}>Média Anual de Radiação Solar (kWh/m²)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setMediaRadiacao(text)}
                    />
                    <Text style={styles.profileLabel}>Topografia</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setTopografia(text)}
                    />
                    <Text style={styles.profileLabel}>Área Total (m²)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setAreaTotal(text)}
                    />
                    <Text style={styles.profileLabel}>Direção Predominante do Vento</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setDirecaoVento(text)}
                    />
                    <Text style={styles.profileLabel}>Velocidade Média do Vento na Região (m/s)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        keyboardType="numeric"
                        onChangeText={(text) => setVelocidadeVento(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => saveEspaco()} style={globalstyles.button}>
                    <Text style={globalstyles.buttontext}>Salvar Espaço</Text>
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
