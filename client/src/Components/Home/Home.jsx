import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
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
} from "react-native";
import Card from "../Card/Card";
import { Header } from "../Header/Header";
import UserDetail from "../UserDetail/UserDetail";
import { useDispatch, useSelector } from "react-redux";
import { getAllPets } from "../../Redux/Actions";
import firebase from "../../firebase/config";
import { getAuth } from "firebase/auth";

const { width, height } = Dimensions.get("screen");

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  const auth = getAuth(firebase); //traemos la authentication de firebase

  const allPets = useSelector((state) => state.allPets);
  useEffect(() => {
    dispatch(getAllPets());
  }, [allPets]);
  function HandleLoginToAdoption() {
    //función que si eres User dirige a crear Pet; si eres Guest te dirige a Loggearte o Registrarte
    auth.currentUser?.uid
      ? navigation.navigate("CreateDog")
      : navigation.navigate("Login");
  }
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        style={styles.body}
        numColumns={2}
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
