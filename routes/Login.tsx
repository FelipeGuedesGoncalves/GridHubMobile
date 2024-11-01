import { Button, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { auth } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { User } from '@/models/User.interface';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalstyles } from '@/styles/globalstyles';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                await checkUidInStorage(currentUser.uid);
                setTimeout(() => navigation.navigate('MyTabs', { uid: currentUser.uid }), 1000); // Atraso para o Toast
            }
        });
        return () => unsubscribe();
    }, [navigation]);

    // Função para verificar e registrar o UID no AsyncStorage
    async function checkUidInStorage(uid) {
        try {
            const storedUids = await AsyncStorage.getItem('JaAcessou');
            const uids = storedUids ? JSON.parse(storedUids) : [];

            if (!uids.includes(uid)) {
                Toast.show({
                    type: 'success',
                    text1: 'Bem Vindo(a), considere assistir nosso tutorial',
                });

                console.log('Novo usuário detectado, registrando no AsyncStorage');
                
                uids.push(uid);
                await AsyncStorage.setItem('JaAcessou', JSON.stringify(uids));
                console.log('AsyncStorage atualizado:', uids);
            } else {console.log('Usuário acessou anteriormente')}
        } catch (error) {
            console.error('Erro ao acessar o AsyncStorage:', error);
        }
    }

    async function login() {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Todos os campos devem ser preenchidos',
            });
            return;
        }

        auth
            .signInWithEmailAndPassword(email, password)
            .then(async (response) => {
                setUser(response.user);
                await checkUidInStorage(response.user.uid);
                setTimeout(() => navigation.navigate('MyTabs', { uid: response.user.uid }), 1000); // Atraso para o Toast
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Algo deu errado',
                    text2: 'Erro ao logar usuário. Tente novamente.',
                });
            });
    }

    return (
        <LinearGradient
            colors={['#7913EE', '#9249FF']}
            style={styles.container}
        >
            <Text style={styles.welcomeText}>Seja Bem-Vindo(a) de volta ao</Text>
            <Image source={require('@/assets/images/insightwiselogo.png')} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor="#4B0082"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                placeholderTextColor="#4B0082"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <TouchableOpacity
                onPress={login}
                style={globalstyles.largebutton}
            >
                <Text style={globalstyles.buttontext}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Ou</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Cadastro')}
                style={globalstyles.largebutton}
            >
                <Text style={globalstyles.buttontext}>Cadastro</Text>
            </TouchableOpacity>

            <Toast />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 100,
        color: '#FFF',
        fontWeight: 'bold',
    },
    logo: {
        width: 290,
        height: 100,
        marginTop: 16,
        resizeMode: 'contain'
    },
    input: {
        width: 350,
        height: 60,
        borderColor: '#6200EE',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginTop: 20,
        fontSize: 16,
        backgroundColor: '#FFF',
        color: '#4B0082'
    },
    orText: {
        marginTop: 12,
        marginBottom: 12,
        fontSize: 16,
        color: '#ffffff',
        fontWeight: 'bold'
    }
});
