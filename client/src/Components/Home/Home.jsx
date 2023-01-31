import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Card from "../Card/Card";
import { Header } from "../Header/Header";
import UserDetail from "../UserDetail/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import { getAllPets, checked, setIsLoggedIn } from "../../Redux/Actions";
import firebase from "../../firebase/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "../../firebase/pushNotifications";
const { width, height } = Dimensions.get("screen");

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const allPets = useSelector((state) => state.allPets);

  const check = useSelector((state) => state.check);

  //se ejecuta cuando se vé, focus=concentrar algo asi
  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        dispatch(getAllPets());
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );

  function HandleLoginToAdoption() {
    //función que si eres User dirige a crear Pet; si eres Guest te dirige a Loggearte o Registrarte
    isLoggedIn
      ? navigation.navigate("CreatePet")
      : navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <PushNotification />
      <Header navigation={navigation} />

      <FlatList
        style={styles.body}
        numColumns={2}
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={allPets.payload}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
      ></FlatList>

      <StatusBar style="auto" />
      <View style={styles.floatingAdoptionContainer}>
        <View>
          <TouchableOpacity
            style={styles.adoptionButton}
            onPress={HandleLoginToAdoption}
          >
            <Image
              className="w-16 h-16 "
              source={require("../../images/Trust.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa",
    width,
  },

  body: {
    backgroundColor: "#AB4E68",
    padding: 10,
  },
  floatingAdoptionContainer: {
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  adoptionButton: {
    borderRadius: 100,
    backgroundColor: "#FFC733",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
