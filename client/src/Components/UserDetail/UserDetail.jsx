import React, { useState, useMemo, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../../firebase/firebase-config";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { getPetByOwner, getUser } from "../../Redux/Actions";
import { useFocusEffect } from "@react-navigation/native";
import BottomSheet from "@gorhom/bottom-sheet";
import Card from "../Card/Card";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");

export default function UserDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const currentPets = useSelector((state) => state.currentPets);
  const currentUser = useSelector((state) => state.currentUser);

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        dispatch(getPetByOwner());
        dispatch(getUser());
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );
  function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toUpperCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  //NO BORRAR A NO SER Q QUIERAN MEJORARLO---------------------
  const auth = getAuth(firebase);
  function logoutUser() {
    signOut(auth)
      .then(() => {
        // clear session storage
        // AsyncStorage.clear(() => {
          AsyncStorage.clear();
          navigation.navigate("LandigPage")
        })
      // })
      .catch((error) => {
        // An error happened.
        console.error("⚠️ Error -> 🚨 UserDetail -> 🔔logoutUser: " + error);
      });
  }
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["55%", "77%"], []);
  const [open, setOpen] = useState(-1);

  function handleButtons() {
    setOpen(0);
  }

  return (
    <View style={{ height: height }} className="bg-[#ACACAC]">
      <ImageBackground
        style={{
          width: "100%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}
        source={{ uri: currentUser?.profilePic }}
        blurRadius={10}
      >
        <LinearGradient
          colors={["#00000000", "#ACACAC"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View>
            <Header
              onPress={() => navigation.navigate("Home")}
              handleButtons={handleButtons}
            />
            <Image
              className="w-64 h-64 bottom-10 mx-auto rounded-full"
              source={{ uri: currentUser?.profilePic }}
            />
          </View>
        </LinearGradient>
        <View className="flex flex-row justify-between w-11/12 mx-auto bottom-8">
          <Text
            style={{ fontFamily: "Roboto_300Light" }}
            className="text-4xl text-[#ffc733]"
          >
            {`${toCamelCase(currentUser.firstName || " ")}  ${toCamelCase(currentUser.lastName || " ")}`}

          </Text>
          <Text className=" text-4xl text-[#ffc733]">
            {currentUser?.rating?.rating ? currentUser?.rating.rating : 5}★
          </Text>
        </View>
      </ImageBackground>
      <View>
        <Text
          className="text-center text-2xl text-[#2A2B20] m-[5%]"
          style={{ fontFamily: "Roboto_300Light" }}
        >
          {currentUser?.description}
        </Text>
      </View>
      <ImageBackground
        source={require("../../images/Banderin-r.png")}
        className="w-[70%]"
      >
        <Text
          className="text-start text-2xl text-[#2A2B20] ml-[10%]"
          style={{ fontFamily: "Roboto_300Light" }}
        >
          Mascotas:
        </Text>
      </ImageBackground>
      <FlatList
        style={{ width: width, height: width, marginBottom: height * 0.02 }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={currentPets}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
      ></FlatList>

      <BottomSheet
        backgroundStyle={{ backgroundColor: "rgba(134, 134, 134,0.9)" }}
        ref={bottomSheetRef}
        index={open}
        snapPoints={snapPoints}
        keyboardBehavior="extend"
        enablePanDownToClose={true}
        onClose={() => setOpen(-1)}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Notificaciones")}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Icon
            name="bell"
            className="w-12 h-12 mr-[20%]"
            size={50}
            color={"#FFC733"}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Notificaciones
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserSolicitudes")}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Icon
            name="chat"
            className="w-12 h-12 mr-[20%]"
            size={50}
            color={"#FFC733"}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Mis Solicitudes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile", currentUser)}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Icon
            name="pencil"
            className="w-12 h-12 mr-[20%]"
            size={50}
            color={"#FFC733"}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Editar Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePet")}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Image
            className="w-12 h-12 mr-[20%]"
            source={require("../../images/Trust-profile.png")}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Publicar Mascota
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Prices")}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Icon
            name="hand-coin"
            className="w-12 h-12 mr-[20%]"
            size={50}
            color={"#FFC733"}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Donar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MisReseñas", currentUser)}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Icon
            name="message-draw"
            className="w-12 h-12 mr-[20%]"
            size={50}
            color={"#FFC733"}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Reseñas que te dieron
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logoutUser}
          className="flex flex-row items-center my-[5%] mx-[10%]"
        >
          <Icon
            name="logout"
            className="w-12 h-12 mr-[20%]"
            size={50}
            color={"#FFC733"}
          />
          <Text
            className="text-2xl"
            style={{ fontFamily: "Roboto_300Light", color: "white" }}
          >
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
}
