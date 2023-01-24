
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRTnBQKqCxWVqBmvOG3p9ykmx9LI30Yjk",
    authDomain: "findahomehenry.firebaseapp.com",

    projectId: "findahomehenry",
    storageBucket: "findahomehenry.appspot.com",
    messagingSenderId: "328480437483",
    appId: "1:328480437483:web:e54fb1f45facfaaa86baae",
};


const fire = initializeApp(firebaseConfig);

export default fire;
