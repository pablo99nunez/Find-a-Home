import React from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import Card from "../Card/Card"
// const { width, height } = Dimensions.get("screen")
const HEIGHT = Dimensions.get("screen").height;

export default function UserDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const currentPets = useSelector((state) => state.currentPets);
  const currentUser = useSelector((state) => state.currentUser);


  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        dispatch(getPetByOwner());
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );

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
    <View
      style={{ height: HEIGHT }}
      className="bg-[#ACACAC] flex justify-between"
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
      <View className="flex flex-row justify-between w-11/12 mx-auto">
        <Text className=" text-4xl">{currentUser.firstName} {currentUser.lastName}</Text>
        <Text className=" text-4xl text-[#ffc733]">{currentUser.rating?.rating? currentUser.rating.rating : null}★</Text>
      </View>
      </ImageBackground>
      <View className="mb-4">
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
    </View>
  );
}

const styles = StyleSheet.create({
 
});
