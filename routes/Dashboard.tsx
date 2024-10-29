import { Button, Text, View } from "react-native";
import { auth } from "@/components/Firebase";

export default function Dashboard({ navigation, route}) {
    const { uid = '' } = route.params
    
    return (
        <View>
            <Text>Usuário logado!</Text>
            <Text>{uid}</Text>
            <Button
                title="Deslogar"
                onPress={() => {
                    navigation.navigate('Login')
                    auth.signOut()

                }
                }
            />
        </View>
    )
}