import { StyleSheet } from "react-native";
import { appcolors } from "./appcolors";

export const globalstyles = StyleSheet.create({
    largebutton: {
      width: 350,
      height: 60,
      borderColor: '#ffffff',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginTop: 20,
      fontSize: 16,
      backgroundColor: '#ffffff0',
      color: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    deleteButton:{
      width: 350,
      height: 60,
      borderColor: '#ffffff',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginTop: 20,
      fontSize: 16,
      backgroundColor: '#FF4445',
      color: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      width: 'auto',
      height: 60,
      borderColor: '#ffffff',
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 16,
      marginTop: 20,
      fontSize: 16,
      backgroundColor: '#ffffff0',
      color: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttontext: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    addbutton: {
      width: 'auto',
      height: 60,
      borderColor: '#ffffff0',
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 16,
      marginTop: 20,
      fontSize: 16,
      backgroundColor: appcolors.azulescuro,
      color: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    addbuttontext: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  })