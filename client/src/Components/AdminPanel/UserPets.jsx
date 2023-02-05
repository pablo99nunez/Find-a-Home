import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
export default function UserPets(props) {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [mascotas, setMascotas] = useState();

 const allPets = useSelector((state) => state.allPets)
 useFocusEffect(
  React.useCallback(() => {
    async function evitaReturnDelUseEffect() {
      try {
        await axios
          .get(`${BASE_URL_IP}/admin/getAllPets`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })

          .then((response) => setMascotas(response.data));
      } catch (error) {
        console.error(error.message);
      }
    }
    evitaReturnDelUseEffect();
  }, [])
);
let filtro = mascotas?.filter((ele) => ele.owner === props.route.params)
console.log(filtro)
return(
  <View>
  <FlatList
    initialNumToRender={10}
    keyExtractor={(item) => item.id}
    data={filtro}
    renderItem={({ item }) => (
        <UserCard item={item} navigation={props.navigation}/>
    )}
  ></FlatList>
</View>
)
}