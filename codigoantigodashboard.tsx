// import { Button, Text, View } from "react-native";
// import { useState, useEffect } from "react";
// import { auth, database } from "@/components/Firebase";
// import { UserFromDatabase } from "@/models/UserFromDatabase.interface";

// export default function Dashboard({ navigation, route }) {
//     const [user, setUser] = useState<UserFromDatabase>();
//     const { uid = '' } = route.params;

//     useEffect(() => {
//         // Função para obter usuário
//         const getUser = async () => {
//             const snapshot = await database.ref(`usuario/${uid}`).once('value');
//             setUser(snapshot.val());
//             console.log(snapshot.val());
//         };

//         getUser();

//         // Monitorar mudanças na autenticação do Firebase
//         const unsubscribe = auth.onAuthStateChanged(currentUser => {
//             if (!currentUser) {
//                 setUser(undefined);
//                 navigation.navigate('Login');
//             }
//         });

//         // Cleanup function
//         return () => unsubscribe();
//     }, [uid, navigation]);

//     const handleLogout = () => {
//         auth.signOut();
//     };

//     return (
//         <View>
//             <Text>Usuário logado!</Text>
//             <Text>{user?.name}</Text>
//             <Button
//                 title="Deslogar"
//                 onPress={handleLogout}
//             />
//         </View>
//     );
// }
