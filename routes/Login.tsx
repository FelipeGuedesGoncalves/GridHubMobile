import { Button, StyleSheet, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { auth } from '@/components/Firebase';
import { useState, useEffect } from 'react';
import { User } from '@/models/User.interface';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { globalstyles } from '@/styles/globalstyles';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (user?.uid) {
            navigation.navigate('MyTabs', { uid: user.uid });
        }
    }, [user]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            if (currentUser) {
                navigation.navigate('MyTabs', { uid: currentUser.uid });
            }
        });
        return () => unsubscribe();
    }, [navigation]);

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
            .then((response) => {
                setUser(response.user);
            })
            .catch((error) => {
                let errorMessage = 'Erro ao logar usuário. Tente novamente.';


                Toast.show({
                    type: 'error',
                    text1: 'Algo deu errado',
                    text2: errorMessage,
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
