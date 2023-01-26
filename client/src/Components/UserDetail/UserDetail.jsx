import React from "react";

//3 lineas son las importaciones q hago por todos lados
//Deberia modularizar? Sí.
//Voy a modularizar? Yo diria que no.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../../firebase/firebase-config";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ButtonYellow } from "../Buttons/Buttons";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPetByOwner } from "../../Redux/Actions";
import Card from "../Card/Card"
// const { width, height } = Dimensions.get("screen")
const HEIGHT = Dimensions.get("screen").height;

export default function UserDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const currentPets = useSelector((state) => state.currentPets);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    alert('Bucle infinito userDetail??')
    dispatch(getPetByOwner());
  }, [currentUser]);

  //NO BORRAR A NO SER Q QUIERAN MEJORARLO---------------------
  const auth = getAuth(firebase);
  function logoutUser() {
    signOut(auth)
      .then(() => {
        // clear session storage
        AsyncStorage.clear(() => {
          AsyncStorage.clear();
          navigation.navigate("LandigPage");
        });
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }
  //-----------------------------------------------------------



  return (
    <ScrollView
      style={{ height: HEIGHT }}
      className="bg-[#ACACAC] flex justify-content"
    >
      <ImageBackground
        style={{
          width: "100%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}
        source={{ uri: currentUser.profilePic }}
        blurRadius={10}
      >
        <LinearGradient
          colors={["#00000000", "#ACACAC"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View>
            <Header
              onPress={() => navigation.navigate("Home")}
              navigation={() => navigation.navigate("CreatePet")}
            />
            <Image
              className="w-64 h-64 bottom-6 mx-auto rounded-full"
              source={{ uri: currentUser.profilePic }}
            />
          </View>
        </LinearGradient>
      </ImageBackground>

      <View className="flex flex-row justify-between w-11/12 mx-auto">
        <Text className=" text-4xl">{currentUser.firstName}</Text>
        <Text className=" text-4xl">{currentUser.rating}⭐</Text>
      </View>
      <View className="">
        <View>
          <Text className="text-center text-2xl text-[#2A2B20]">
            {currentUser.description}
          </Text>
        </View>
        <FlatList
          className='my-auto'
          horizontal={true}
          keyExtractor={(item) => item.id}
          data={currentPets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
              <Card style={{ width: 120, height: 120 }} item={item} />
            </TouchableOpacity>
          )}
        ></FlatList>



      <ButtonYellow text="Logout" onPress={logoutUser} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
});
