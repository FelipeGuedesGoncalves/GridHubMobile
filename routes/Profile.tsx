import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { globalstyles } from '@/styles/globalstyles';

export default function Profile({ navigation }) {
    const [userInfo, setUserInfo] = useState({
        name: '',
        cnpj: '',
        telefone: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);

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

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = database.ref(`usuario/${user.uid}`);
            await userRef.set(userInfo);
            setIsEditing(false);
            Toast.show({
                type: 'success',
                text1: 'Alterações salvas com sucesso!',
            });
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEmailPress = () => {
        Alert.alert(
            "Atenção",
            "Por motivos de segurança, seu e-mail só pode ser alterado pela equipe InsightWise, caso deseje prosseguir, contate-nos via email - insightwisesuporte@gmail.com",
            [{ text: "OK" }]
        );
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
                        editable={isEditing}
                        onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                        placeholder="-"
                    />

                    <Text style={styles.profileLabel}>CNPJ</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.cnpj}
                        editable={isEditing}
                        onChangeText={(text) => setUserInfo({ ...userInfo, cnpj: text })}
                        placeholder="-"
                    />

                    <Text style={styles.profileLabel}>Email</Text>
                    <TouchableOpacity onPress={handleEmailPress} >
                        <TextInput
                            style={styles.input}
                            value={userInfo.email}
                            editable={false} // Always disabled
                            placeholder="-"
                        />
                    </TouchableOpacity>

                    <Text style={styles.profileLabel}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.telefone}
                        editable={isEditing}
                        onChangeText={(text) => setUserInfo({ ...userInfo, telefone: text })}
                        placeholder="-"
                        keyboardType="phone-pad"
                    />
                </View>

                {isEditing ? (
                    <>
                        <TouchableOpacity style={globalstyles.largebutton} onPress={handleSaveChanges}>
                            <Text style={styles.buttonText}>Salvar alterações</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalstyles.largebutton} onPress={handleCancelEdit}>
                            <Text style={styles.buttonText}>Cancelar edição</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={globalstyles.largebutton} onPress={handleEditProfile}>
                        <Text style={styles.buttonText}>Editar perfil</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={globalstyles.largebutton} onPress={handleLogout}>
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
    emailTouchable: {
        borderBottomWidth: 1,
        borderBottomColor: '#7913EE',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        height: 500
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
