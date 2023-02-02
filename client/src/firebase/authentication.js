import firebase from "./firebase-config";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { url } from "../Redux/Actions";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth = getAuth(firebase);

export const loginWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      throw error
    })
};

//firebase 3
export const createAccountWithEmailAndPassword = async (
  email,
  password,
  firstName,
  lastName,
  phone,
  conditions
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((resp) => {
      if (resp.user) {
        resp.user.getIdToken().then(async (tkn) => {
          await AsyncStorage.setItem("authorization", "Bearer " + tkn);

          console.log("ESTA ES LA DATA MI REEEI: -->", firstName, lastName, email, phone, conditions)
          await createUserInDb(firstName, lastName, email, phone, conditions);
          // console.log({ authorization: "Bearer " + tkn });
        });
      } else {
        alert(
          "Hubo un error al registrarse, no se obtubo el token en linea 37 de RegistrationScreen.js!"
        );
      }
    })
    .catch(error => {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).')
        alert('El email ingresado ya está en uso!')
      else alert(error.message)
    })
  //CREAMOS EL USUARIO EN LA BASE DE DATOS
  const createUserInDb = async (
    firstName,
    lastName,
    email,
    phone,
    conditions
  ) => {
    const data = {
      firstName,
      lastName,
      profilePic:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Color_icon_warm.svg/600px-Color_icon_warm.svg.png?20100407180532",
      email,
      phone,
      conditions,
    };
    console.log("DATA FOR DB CREATION:", data);
    const tokenDelStore = await AsyncStorage.getItem("authorization").catch(
      (s) => alert("token no encontrado en el store local")
    );
    await axios
      .post(`${url}/user`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.currentUser?.stsTokenManager?.accessToken}`,
        },
      })
      .then((response) => console.log("usuario nuevo creado en la mongodb"))
      .catch((error) => console.error("Error en la promesa de creacion authentication:", error));
  };

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
};
