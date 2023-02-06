import firebase from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth = getAuth(firebase);

export const loginWithEmailAndPassword = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      throw error
    })
};

export const enviarReseteoPasswordPorMail = (email) =>{
  sendPasswordResetEmail(auth, email)
}
export const enviarEmailVerificacion = () =>{
  sendEmailVerification(auth.currentUser)
}

//firebase 3
export const crearYrellenarDB = async (objetoConDatos) => {
  const { email, password } = objetoConDatos
  //cadena de returns para obtener al respuesta
  const response1 = await createUserWithEmailAndPassword(auth, email, password)
  if (response1.user) {
    const tokenn = await response1.user.getIdToken()
    await AsyncStorage.setItem("authorization", "Bearer " + tokenn);
    objetoConDatos.password = "" //para evitar recibir la contraseña de los usuarios
    return {objetoConDatos,tokenn}

  } else {
    throw new Error('Error al obtener los datos del usuario')
  }
};

