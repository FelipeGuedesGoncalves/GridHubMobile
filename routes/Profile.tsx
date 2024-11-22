import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { auth, database } from '@/components/Firebase';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { globalstyles } from '@/styles/globalstyles';
import { appcolors } from '@/styles/appcolors';

export default function Profile({ navigation }) {
    const [userInfo, setUserInfo] = useState({
        name: '',
        telefone: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const user = auth.currentUser;
        if (user) {
            const userRef = database.ref(`usuario/${user.uid}`);
            userRef.on('value', (snapshot) => {
                if (snapshot.exists()) {
                    setUserInfo(snapshot.val());
                } else {
                    console.log('No user data available');
                }
            });
        }
    };

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

    const handleDeleteUser = async () => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir sua conta? Essa ação é irreversível.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const user = auth.currentUser;
                            if (user) {
                                await deleteUserRelatedData(user.uid);
    
                                await database.ref(`usuario/${user.uid}`).remove();
    
                                await user.delete();
    
                                Toast.show({
                                    type: 'success',
                                    text1: 'Conta excluída com sucesso!',
                                });
                                navigation.navigate('Login');
                            }
                        } catch (error) {
                            Toast.show({
                                type: 'error',
                                text1: 'Erro',
                                text2: 'Não foi possível excluir a conta. Tente novamente.',
                            });
                            console.log("Erro ao excluir usuário:", error);
                        }
                    }
                }
            ]
        );
    };
    

    const deleteUserRelatedData = async (userId) => {
        const microgridsRef = database.ref('microgrids');
        const espacosRef = database.ref('espacos');
    
        // Remover microgrids associadas ao usuário
        await microgridsRef.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if (child.val().userId === userId) {
                    microgridsRef.child(child.key).remove();
                }
            });
        });
    
        // Remover espacos associados ao usuário
        await espacosRef.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                if (child.val().userId === userId) {
                    espacosRef.child(child.key).remove();
                }
            });
        });
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
            "Por motivos de segurança, seu e-mail só pode ser alterado pela equipe GridHub, caso deseje prosseguir, contate-nos via email - GridHubsuporte@gmail.com",
            [{ text: "OK" }]
        );
    };

    return (
        <LinearGradient colors={[appcolors.azulescuro, appcolors.azul]} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Perfil do Usuário</Text>

                <View style={styles.whiteBlock}>
                    <Text style={styles.profileTitle}>Dados do Usuário</Text>

                    <Text style={styles.profileLabel}>Nome do Usuário</Text>
                    <TextInput
                        style={styles.input}
                        value={userInfo.name}
                        editable={isEditing}
                        onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                        placeholder="-"
                    />

                    <Text style={styles.profileLabel}>Email</Text>
                    <TouchableOpacity onPress={handleEmailPress} >
                        <TextInput
                            style={styles.input}
                            value={userInfo.email}
                            editable={false}
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

                <TouchableOpacity style={globalstyles.deleteButton} onPress={handleDeleteUser}>
                    <Text style={styles.buttonText}>Excluir Conta</Text>
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
        color: appcolors.azulescuro,
    },
    profileLabel: {
        fontSize: 14,
        marginVertical: 5,
        color: appcolors.azulescuro,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: appcolors.azulescuro,
        marginBottom: 20,
        padding: 8,
        fontSize: 16,
        color: appcolors.azulescuro,
    },
    emailTouchable: {
        borderBottomWidth: 1,
        borderBottomColor: appcolors.azulescuro,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
