import firebase from './firebase-config'
import axios from 'axios'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../Redux/Actions'
const auth = getAuth(firebase);

onAuthStateChanged(auth, user => {
    // Check for user status
    console.log('linea 8 de authentication.js');
});


export const loginWithEmailAndPassword = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password).then((resp) => {
            if (resp.user) {
                resp.user.getIdToken().then(async (tkn) => {
                    await AsyncStorage.setItem('authorization', "Bearer "+ tkn);
                    console.log('authorization', "Bearer "+ tkn)
                })
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }


    //firebase 3
 export const createAccountWithEmailAndPassword = async (email, password,fullName) => {
        await createUserWithEmailAndPassword(auth, email, password).then((resp) => {
            if (resp.user) {
                resp.user.getIdToken().then(async (tkn) => {
                    await AsyncStorage.setItem('authorization', "Bearer "+ tkn);
                    await createUserInDb(fullName, email, password);
                    console.log({authorization: "Bearer "+ tkn})
                })
            }else{
                alert('Hubo un error al registrarse, no se obtubo el token en linea 37 de RegistrationScreen.js!')
            }
        }).catch((err) => {
            console.log(err.message);
        })
        //CREAMOS EL USUARIO EN LA BASE DE DATOS
        const createUserInDb = async (fullName, email) => {
            const profilePic = "https://i.pravatar.cc/150?u=thefakeuser.jpg"
            const phone = "01155555555"
            const data = { firstName: fullName, lastName: fullName, profilePic: profilePic, email: email, phone };
            console.log("DATA FOR DB CREATION:", data)
            const tokenDelStore = await AsyncStorage.getItem('authorization').catch(s=>alert('token no encontrado en el store local'))
            await axios.post(`${url}/user`, data, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `${tokenDelStore}`
                    }
                })
            .then(response => console.log('usuario nuevo creado en la mongodb'))
            .catch(error => console.error('Error:', error));

        }

        /* firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        }); */
    }