import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { globalstyles } from '@/app/(tabs)';

export default function Profile({ navigation }) {
    const [userInfo, setUserInfo] = useState({
        name: '',
        cnpj: '',
        telefone: '',
        email: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = database.ref(`usuario/${user.uid}`);
                userRef.once('value', (snapshot) => {
                    if (snapshot.exists()) {
                        setUserInfo(snapshot.val());
                    } else {
                        console.log('No user data available');
                    }
                });
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Login');
            Toast.show({
                type: 'success',
                text1: 'Deslogado com sucesso!',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Falha ao deslogar. Tente novamente.',
            });
        }
    };

    return (
        <LinearGradient colors={['#7913EE', '#9249FF']} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Perfil da Empresa</Text>

                <View style={styles.whiteBlock}>
                    <Text style={styles.profileTitle}>Dados da Empresa</Text>

                    <Text style={styles.profileLabel}>Nome da empresa</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.name}
                        editable={false}
                        placeholder="-"
                    />

                    <Text style={styles.profileLabel}>CNPJ</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.cnpj}
                        editable={false}
                        placeholder="-"
                    />

                    <Text style={styles.profileLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.email}
                        editable={false}
                        placeholder="-"
                        keyboardType="email-address"
                    />

                    <Text style={styles.profileLabel}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.telefone}
                        editable={false}
                        placeholder="-"
                        keyboardType="phone-pad"
                    />
                </View>

                <TouchableOpacity
                    style={globalstyles.largebutton}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Deslogar</Text>
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
    },
    scrollView: {
        flex: 1,
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 20,
    },
    whiteBlock: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
    },
    profileTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#7913EE',
    },
    profileLabel: {
        fontSize: 14,
        marginVertical: 5,
        color: '#7913EE',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#7913EE',
        marginBottom: 20,
        padding: 8,
        fontSize: 16,
        color: '#650FC8',
    },
    button: {
        backgroundColor: '#7913EE',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
