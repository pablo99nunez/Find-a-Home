// Import the functions you need from the SDKs you need//
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
/**
 * 
 * METODOS Q NO FUNCIONAN EN REACT NATIVE
 *  signInWithPopup(),
 *  signInWithRedirect(),
 *  linkWithPopup(),
 *  linkWithRedirect()
 *
 * You can still sign in or link with a federated provider by using 
 * signInWithCredential() with an OAuth token from your provider of choice.
React Native does not support the File and Blob types, so Firebase Storage uploads will not work in this environment. File downloads do work however.
 * 
 */
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

/* import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore'; */
import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDRTnBQKqCxWVqBmvOG3p9ykmx9LI30Yjk",
  authDomain: "findahomehenry.firebaseapp.com",
  projectId: "findahomehenry",
  storageBucket: "findahomehenry.appspot.com",
  messagingSenderId: "328480437483",
  appId: "1:328480437483:web:e54fb1f45facfaaa86baae",
 // measurementId: "G-KP2VVJD4MR"
};


/* if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase }; */

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

//como usar
//1) importar firebaseApp donde se necesite
// import firebaseApp from "../rutarelativa/firebase-config.js"
//2)crear variables de storage usando
//let defaultStorage = getStorage(firebaseApp);
//let defaultFirestore = getFirestore(firebaseApp);
