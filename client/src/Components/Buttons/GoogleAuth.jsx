import React from "react";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";
import firebase from "../../firebase/firebase-config";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { retriveUserData } from "../../Redux/Actions/index";
import { url } from "../../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from "@expo/vector-icons/FontAwesome";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton({ navigation, showBg = true }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "328480437483-ui4cd46sm4u1cug87tglkctvaejd4m0u.apps.googleusercontent.com",
    iosClientId:
      "328480437483-vte34pclcdb967pbu5crp7hahdakrshg.apps.googleusercontent.com",
    androidClientId:
      "328480437483-2gvjcajietdu6ob3oqhft45mk38gv7a4.apps.googleusercontent.com",
  });

  const [userData, setUserData] = useState({});
  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(async (res) => {
          const result = await retriveUserData();
          const token = await auth.currentUser.getIdToken();
          console.log(result.user);
          const { name, email, photoURL } = result.user;
          setUserData({ name, email, photoURL, token });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [response]);

  React.useEffect(() => {
    if (response?.type === "success" && userData.email) {
      try {
        (async function () {
          const response = await axios.get(url + "/user/profile", {
            headers: {
              Authorization: `Bearer ${userData?.token && userData.token}`,
            },
          });
        })()
          .then((res) => {
            console.log(res);
            goToRegister(true);
          })
          .catch((error) => {
            console.error(error);
            goToRegister(false);
          });
      } catch (error) {
        console.error(error);
      }
    }
  }, [userData]);

  async function goToRegister(userExistInDb) {
    userExistInDb
      ? navigation.navigate("Home")
      : navigation.navigate("RegisterFirstStepsGoogle", userData);
  }
  function logoutUser() {
    setUserData({});
    const auth = getAuth(firebase);
    signOut(auth)
      .then(() => {
        // clear session storage
        AsyncStorage.clear(() => {
          AsyncStorage.clear();
        });
      })
      .catch((error) => {
        // An error happened.
        console.error("⚠️ Error -> 🚨 UserDetail -> 🔔logoutUser: " + error);
      });
  }

  return (
    <View className="h-full min-w-full relative items-center justify-center">
      {showBg && (
        <>
          <ImageBackground
            style={{
              backgroundImage: "linear-gradient",
              backgroundSize: "cover",
            }}
            className="h-full w-full top-0 left-0 absolute z-[-50]"
            source={require("../../images/bg-google.png")}
            blurRadius={0}
          ></ImageBackground>
          <Image
            className="absolute -bottom-40 z-[5]"
            source={require("../../images/pets-png.png")}
          />
        </>
      )}
      <View
        title="Login"
        // onPress={() => promptAsync()}
        className="flex flex-col items-center justify-between content-around m-auto z-[20]"
      >
        <View className="flex flex-row items-center justify-between content-around m-auto ">
          <Image
            className="h-32 w-32 justify-self-start my-16 rounded-full z-10"
            source={require("../../images/LOGO-1024PX.png")}
          />
        </View>

        <View>
          <TouchableOpacity className="shadow">
            <FontAwesome.Button
              name="google"
              onPress={() => promptAsync()}
              backgroundColor="#FFC733"
              style={{ fontFamily: "Roboto" }}
            >
              Login with Google
            </FontAwesome.Button>
          </TouchableOpacity>
          <View className="h-32 my-5">
            <Text className="text-center text-yellow">
              Accedé a Find A Home
            </Text>
            <Text className="text-center text-yellow">
              desde tu cuenta de Google
            </Text>
            <Text className="text-center text-yellow">o</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text className="text-center text-yellow text-[16px] font-bold">
                Ingresá como invitado
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
