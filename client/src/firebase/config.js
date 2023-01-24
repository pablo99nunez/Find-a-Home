
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, uploadString  } from "firebase/storage";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDRTnBQKqCxWVqBmvOG3p9ykmx9LI30Yjk",
    authDomain: "findahomehenry.firebaseapp.com",

    projectId: "findahomehenry",
    storageBucket: "findahomehenry.appspot.com",
    messagingSenderId: "328480437483",
    appId: "1:328480437483:web:e54fb1f45facfaaa86baae",
};


const fire = initializeApp(firebaseConfig);
export const storage = getStorage(fire) //se configura getstorage
export default fire;



//supuestamente recibe el archivo
export const uploadFire = async(file) =>{

const storageRef = storage.ref()    
            //storageref  el archivo  nombre   respuesta de la promesa
uploadBytes(storageRef, file, "some-child").then(snapshot =>{
    console.log('Uploaded a data_url string!');
})
}