import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
    apiKey: "AIzaSyB4Zmdu83t1-Hp8SDj2ieXZUtB3EtTaiwY",
    authDomain: "vue-skills-29ea5.firebaseapp.com",
    databaseURL: "https://vue-skills-29ea5.firebaseio.com",
    projectId: "vue-skills-29ea5",
    storageBucket: "",
    messagingSenderId: "420664113948",
    appId: "1:420664113948:web:d12bf7fb8358f74d"
})

export const db = firebase.firestore();