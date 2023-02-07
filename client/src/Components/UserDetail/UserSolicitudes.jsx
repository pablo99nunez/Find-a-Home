import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, Dimensions } from "react-native";
import { log } from "react-native-reanimated";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";

export const UserSolicitudes = () => {
  const token = auth.currentUser?.stsTokenManager.accessToken;

  const [infoUser, setInfoUser] = useState();
  const currentUser = useSelector((state) => state.currentUser);
  const { width, height } = Dimensions.get("screen");

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/user/misSolicitudes2`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setInfoUser(response.data));
        } catch (error) {
          console.error(error.message);
        }
      }
      evitaReturnDelUseEffect();
    }, [])
  );

  console.log("infoUser", infoUser);
  /*   console.log("currentUser.misSolicitudes", currentUser.misSolicitudes); */

  return (
    <View
      style={{ height: height * 0.98, width: width }}
      className="bg-[#d9d9d9] "
    >
      <FlatList
        keyExtractor={(item) => item.title}
        data={infoUser}
        renderItem={({ item }) => (
          <View className="bg-[#AB4E68] flex flex-row mx-[3%] my-[2%] p-[3%] rounded-xl items-center">
            <Image
              className="h-[100%] w-[15%] m-2"
              resizeMode="contain"
              source={require("../../images/FindAHome.png")}
            />
            <View>
              <Text className="text-[#d9d9d9] font-extralight text-sm w-[60%]">
                Nombre de la mascota: {item?.petName}
              </Text>
              <Text className="text-[#d9d9d9] font-extralight text-sm w-[60%]">
                Dueño: {item?.ownerFullname}
              </Text>

              <Text className="text-[#d9d9d9] font-light w-[60%]">
                Mensaje: {item?.message}
              </Text>
              <Image
                className="h-[100%] w-[15%] m-2"
                resizeMode="contain"
                source={{ uri: item?.profilePic }}
              />
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};
