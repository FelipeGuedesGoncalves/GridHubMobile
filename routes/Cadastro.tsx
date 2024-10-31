import { Button, StyleSheet, TextInput, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { User } from '@/models/User.interface';
import { LinearGradient } from 'expo-linear-gradient';
import { globalstyles } from '@/app/(tabs)';
import Toast from 'react-native-toast-message';
import { checkCnpj } from '@/client/client';
import { CnpjResponse } from '@/models/CnpjResponse.interface';

export default function Cadastro({ navigation }) {
    const [name, setName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (user?.uid) {
            navigation.navigate('Dashboard', { uid: user?.uid });
            saveUserOnDatabase();
        }
    }, [user]);

    async function saveUserOnDatabase() {
        database.ref(`usuario/${user?.uid}`).set({
            name: name,
            cnpj: cnpj,
            telefone: telefone,
            email: email,
            uid: user?.uid,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    async function createUser() {
        if (!name || !cnpj || !telefone || !email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Todos os campos devem ser preenchidos',
            });
            return;
        }

        // Verifica a existência do CNPJ
        const cnpjData: CnpjResponse | null = await checkCnpj(cnpj);
        if (!cnpjData) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'CNPJ não encontrado. Verifique e tente novamente.',
            });
            return;
        }

        // Continue com a criação do usuário
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
            })
            .catch((error) => {
                let errorMessage = '';
                switch (error.code) {
                    case 'auth/invalid-email':
                        errorMessage = 'Email inválido. Verifique o formato.';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = 'Este email já está cadastrado.';
                        break;
                    default:
                        errorMessage = 'Erro ao criar usuário. Tente novamente.';
                        break;
                }

                Toast.show({
                    type: 'error',
                    text1: 'Erro!',
                    text2: errorMessage,
                });
            });
    }

    return (
        <LinearGradient colors={['#7913EE', '#9249FF']} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('@/assets/images/insightwiselogo.png')} // Ajuste o caminho conforme necessário
                    />
                    <TouchableOpacity
                        style={globalstyles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={globalstyles.buttontext}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Faça seu Cadastro</Text>
                <View style={styles.whiteBlock}>
                    <Text style={styles.profileTitle}>Dados da empresa</Text>
                    <Text style={styles.profileSubtitle}>Preencha com base nos dados da sua empresa</Text>
                    <Text style={styles.profileLabel}>Nome da empresa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setName(text)}
                    />
                    <Text style={styles.profileLabel}>CNPJ</Text>
                    <Text style={styles.profileSubtitle}>(Preencher sem formatação - apenas com números)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setCnpj(text)}
                    />
                    <Text style={styles.profileLabel}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <Text style={styles.profileTitle}>Contatos</Text>
                    <Text style={styles.profileSubtitle}>Enviaremos boletos, informações úteis e códigos nestes contatos. (o Email cadastrado também será utilizado para login)</Text>
                    <Text style={styles.profileLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <Text style={styles.profileLabel}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setTelefone(text)}
                        keyboardType="phone-pad"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => createUser()}
                    style={globalstyles.button}
                >
                    <Text style={globalstyles.buttontext}>Finalizar Cadastro</Text>
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
        color: '#650FC8'
    },
    scrollView: {
        flex: 1,
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 50,
        marginLeft: 20,
        marginRight: 90,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 40,
        marginLeft: 20,
        fontWeight: 'bold'
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
        padding: 34,
    },
    profileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#650FC8'
    },
    profileSubtitle: {
        marginBottom: 20,
        color: '#650FC8'
    },
    profileLabel: {
        marginTop: 16,
        fontWeight: 'bold',
        color: '#650FC8'
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 20,
        borderColor: '#650FC8',
        color: '#650FC8'
    },
});
