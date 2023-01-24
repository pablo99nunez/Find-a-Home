import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import { initializeApp } from "firebase/app";
import "firebase/auth"

export const firebaseConfig = {
    apiKey: "AIzaSyDRTnBQKqCxWVqBmvOG3p9ykmx9LI30Yjk",
    authDomain: "findahomehenry.firebaseapp.com",

    projectId: "findahomehenry",
    storageBucket: "findahomehenry.appspot.com",
    messagingSenderId: "328480437483",
    appId: "1:328480437483:web:e54fb1f45facfaaa86baae",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);

export {app, firebase}