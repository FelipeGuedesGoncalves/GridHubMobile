import { Button, StyleSheet, TextInput, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { User } from '@/models/User.interface';
import { LinearGradient } from 'expo-linear-gradient';
import { globalstyles } from '@/styles/globalstyles';
import Toast from 'react-native-toast-message';
import { appcolors } from '@/styles/appcolors';

export default function Cadastro({ navigation }) {
    const [name, setName] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (user?.uid) {
            navigation.navigate('Login', { uid: user?.uid });
            saveUserOnDatabase();
        }
    }, [user]);

    async function saveUserOnDatabase() {
        // Salva as informações básicas do usuário no banco de dados
        database
            .ref(`usuario/${user?.uid}`)
            .set({
                name: name,
                telefone: telefone,
                email: email,
            })
            .then(() => {
                console.log('Usuário salvo no banco de dados com sucesso.');
            })
            .catch((error) => {
                console.log('Erro ao salvar usuário no banco de dados:', error);
            });
    }

    async function createUser() {
        if (!name || !telefone || !email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Todos os campos devem ser preenchidos',
            });
            return;
        }

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
        <LinearGradient colors={[appcolors.azulescuro, appcolors.azul]} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('@/assets/images/GridHubTextLogoWhite.png')}
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
                    <Text style={styles.profileTitle}>Credenciais</Text>
                    <Text style={styles.profileSubtitle}>
                        Você usará estas credenciais para realizar login em nossa plataforma
                    </Text>
                    <Text style={styles.profileLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <Text style={styles.profileLabel}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <Text style={styles.profileTitle}>Dados restantes</Text>
                    <Text style={styles.profileSubtitle}>Preencha com base nos seus dados</Text>
                    <Text style={styles.profileLabel}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="-"
                        onChangeText={(text) => setName(text)}
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
        color: appcolors.azulescuro,
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
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 40,
        marginLeft: 20,
        fontWeight: 'bold',
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
        color: appcolors.azulescuro,
    },
    profileSubtitle: {
        marginBottom: 20,
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
