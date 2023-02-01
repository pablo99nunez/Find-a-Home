import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/authentication";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./Redux/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Inicio componente PersistentLogin, sirve para que se actualize el estado de isLoggedIn a través
//de toda la app sin importtarle qué Stack esté puesto, por eso se invoca en App.js fuera de NavigationContainer
//pero dentro del provider de store, ese provider nos permite hacer dispatchs hacia el Store global.
export default PersistentLogin = () => {
  const dispatch = useDispatch();

  //Esto se ejecuta automaticamente, firebase hace que se ejecute esto cuando el token expira.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdToken().then(async (tkn) => {
        await AsyncStorage.setItem(
          "authorization",
          "Bearer " + tkn
        )
        dispatch(setIsLoggedIn(true));
        //No mover este console log de acá, pueden comentario si quieren.
        console.log("authorization", "Bearer " + tkn);
      }).catch((err) => {
        console.error("PersistentLogin.jsx: onAuthStateChanged: " + err.message);
      })
    } else {
      AsyncStorage.clear();
      dispatch(setIsLoggedIn(false));
    }
  });



  return (
    <>
    </>
  );
};

