import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/authentication";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "./Redux/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";


const checkTokenFreshness = async () => {
  const user = auth.currentUser;
  const { claims } = await user.getIdTokenResult();
  const tokenIssuedAt = claims.iat * 1000;
  const currentTime = Date.now();
  const tokenFreshness = currentTime - tokenIssuedAt < claims.exp * 1000;
  return tokenFreshness;
};

const refreshToken = async () => {
  const user = auth.currentUser;
  await user.reload();
  const freshToken = await user.getIdToken();
  return freshToken;
};  

const checkAndRefreshToken = async () => {
  const isTokenFresh = await checkTokenFreshness();
  if (!isTokenFresh) {
    return refreshToken();
  }
  return auth.currentUser.getIdToken();
};

//Inicio componente PersistentLogin, sirve para que se actualize el estado de isLoggedIn a través
//de toda la app sin importtarle qué Stack esté puesto, por eso se invoca en App.js fuera de NavigationContainer
//pero dentro del provider de store, ese provider nos permite hacer dispatchs hacia el Store global.
export default PersistentLogin = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  //Esto se ejecuta automaticamente, firebase hace que se ejecute esto cuando el token expira.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdToken().then(async (tkn) => {
        await AsyncStorage.setItem(
          "authorization",
          "Bearer " + tkn
        )
        setToken("Bearer " + tkn);
        dispatch(setIsLoggedIn(true));
        //No mover este console log de acá, pueden comentario si quieren.
        console.log("authorization", "Bearer " + tkn);
      }).catch((err) => {
        console.error("PersistentLogin.jsx: onAuthStateChanged: " + err.message);
      })
    } else {
      AsyncStorage.clear();
      setToken(null);
      dispatch(setIsLoggedIn(false));
    }
  });

  useEffect(() => {
    if (token) {
      const intervalId = setInterval(async () => {
        const isTokenFresh = await checkTokenFreshness();
        if (!isTokenFresh) {
          const newToken = await refreshToken();
          setToken(newToken);
          await AsyncStorage.setItem("authorization", "Bearer " + newToken);
        }
      }, 1000 * 60 * 1);
      return () => clearInterval(intervalId);
    }
  }, [token]);



  return (
    <>
    </>
  );
};

