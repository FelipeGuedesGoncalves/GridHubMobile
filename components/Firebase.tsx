import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

const firebaseConfig = {
    clientId: 'insightwisemobile',
    appId:'insightwisemobile',
    apiKey:'AIzaSyB2DjSl-1nDQDMG5OT-H7L3ua2IYuyxFTA',
    databaseURL:'https://insightwisemobile-default-rtdb.firebaseio.com/',
    storageBucket:'gs://insightwisemobile.appspot.com',
    messagingSenderId: '', 
    projectId:'insightwisemobile'
}

firebase.initializeApp(firebaseConfig)

const apps = firebase.apps

apps.forEach(app => console.log(app.name))

const auth = firebase.app().auth()
export {firebase, auth}