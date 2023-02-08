import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../Card/Card";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { FlatList } from "react-native-gesture-handler";
import Review from "./Review";

const {width, height } = Dimensions.get("screen")

export const ProfileOthers = ({ route, navigation }) => {
  const { email, profilePic, firstName, lastName, rating } = route.params;
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [userProfile, setUserProfile] = useState({});
  const [pets, setPets] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/user?email=${email}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setUserProfile({ ...response.data[0] }));
          await axios
            .get(`${BASE_URL_IP}/pet/byowner?email=${email}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setPets([...response.data]));
        } catch (error) {
          if (typeof error.response !== "undefined")
            console.error("ProfileOthers.jsx" + error.response.data.error)
          else
            console.error("⚠️ Error -> 🚨 ProfileOthers -> 🔔 gettingUser: " + error.message);
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );

  console.log(userProfile.reviews)
  return (
    <View
      style={{ height: height }}
      className="bg-[#ACACAC]"
    >
      <ImageBackground
        style={{
          width: "100%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}
        source={{ uri: profilePic }}
        blurRadius={10}
      >
        <LinearGradient
          colors={["#00000000", "#ACACAC"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View>
            <Image
              className="w-64 h-64 bottom-6 mx-auto rounded-full mt-[20%]"
              source={{ uri: profilePic }}
            />
          </View>
        </LinearGradient>
        <View className="flex flex-row justify-between w-11/12 mx-auto">
          <Text style={{fontFamily: 'Roboto_300Light'}} className="text-4xl text-[#ffc733]">
          {firstName[0].toUpperCase().concat(firstName.toLowerCase().substring(1))} {lastName[0].toUpperCase().concat(lastName.toLowerCase().substring(1))}
            </Text>
          <Text className=" text-4xl text-[#ffc733]">
            {rating?.rating ? rating.rating : 5}★
          </Text>
        </View>
      </ImageBackground>

      <View>
        <Text className="text-center text-2xl text-[#2A2B20] my-[15%]" style={{fontFamily: 'Roboto_300Light'}}>
        {userProfile.description ? userProfile.description : null}
        </Text>
      </View>

      <View className="flex items-center w-11/12 mx-auto">
        <Text className="text-center text-2xl text-[#2A2B20] font-light">
          Las condiciones que le puedo brindar a mi mascota son:
        </Text>
        <View className="flex flex-row flex-wrap w-10/12 justify-center">
          {userProfile.conditions?.Techo ? (
            <View className="mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 ">
              <Text className="text-[#fff]">Techo</Text>
            </View>
          ) : null}
          {userProfile.conditions?.AlimentoBalanceado ? (
            <View className="mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 ">
              <Text className="text-[#fff]">Alimento Balanceado</Text>
            </View>
          ) : null}
          {userProfile.conditions?.PaseosDiarios ? (
            <View className="mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 ">
              <Text className="text-[#fff]">Paseos Diarios</Text>
            </View>
          ) : null}
          {userProfile.conditions?.Vacunas ? (
            <View className="mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 ">
              <Text className="text-[#fff]">Vacunas</Text>
            </View>
          ) : null}
          {userProfile.conditions?.Castración ? (
            <View className="mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 ">
              <Text className="text-[#fff]">Castración</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View>
        <ImageBackground
          source={require("../../images/Banderin-r.png")}
          className="w-[70%] my-[3%]"
        >
          <Text
            className="text-start text-2xl text-[#2A2B20] ml-[10%]"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            Reseñas:
          </Text>
        </ImageBackground>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={userProfile.reviews}
          renderItem={({ item }) => (
              <Review item={item} />
            )}
        ></FlatList>
      </View>
    </View>
  );
};
