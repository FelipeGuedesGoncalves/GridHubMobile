import { StyleSheet, View } from 'react-native';
import { auth } from '@/components/Firebase'

export default function HomeScreen() {
  auth
    .createUserWithEmailAndPassword('email@email.com', '12345678')
    .then((response) => {
      console.log
    })
  return (
    <View>
      
    </View>
  );
}

const styles = StyleSheet.create({

});
