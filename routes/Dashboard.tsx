import { Button, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { auth } from "@/components/Firebase";
import { database } from "@/components/Firebase";
import { UserFromDatabase } from "@/models/UserFromDatabase.interface";

export default function Dashboard({ navigation, route}) {
    const [user, setUser] = useState<UserFromDatabase>()
    const { uid = '' } = route.params

    async function getUser() {
        database
            .ref(`usuario/${uid}`)
            .once('value')
            .then((snapshot) => {
                setUser(snapshot.val())
                console.log(snapshot)
            })
    }

    getUser()
    
    return (
        <View>
            <Text>Usuário logado!</Text>
            <Text>{user?.name}</Text>
            <Button
                title="Deslogar"
                onPress={() => 
                    {
                        navigation.navigate('Login')
                        auth.signOut()

                    }
                }
            />
        </View>
    )
}