import { Button, StyleSheet, TextInput, View } from 'react-native';
import { auth } from '@/components/Firebase';
import { useState, useEffect } from 'react'
import React from 'react';


export default function HomeScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})

useEffect(() => {
  if (user) {
    console.log('Navegar para a home')
  }
})

  async function createUser() {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      setUser(response.user)
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  return (
    <View style={{margin: 24}}>
      <TextInput
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder='Senha'
        onChangeText={(text) => setPassword(text)}
        secureTextEntry = {true} 
      />
      <Button title='Criar Usuário'
      onPress={() => createUser()}
      />


    </View>
  );
}

const styles = StyleSheet.create({

});
