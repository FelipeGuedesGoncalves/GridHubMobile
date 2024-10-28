import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

const firebaseConfig = {
    clientId: 'insightwisemobile',
    appId:'insightwisemobile',
    apiKey:'AIzaSyB2DjSl-1nDQDMG5OT-H7L3ua2IYuyxFTA',
    databaseURL:'https://insightwisemobile-default-rtdb.firebaseio.com/',
    storageBucket:'gs://insightwisemobile.appspot.com',
    projectId:'insightwisemobile'
}

firebase.initializeApp(firebaseConfig)