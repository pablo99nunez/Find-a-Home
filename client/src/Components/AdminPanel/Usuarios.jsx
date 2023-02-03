import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";
import UserCard from "./UserCard";

export default function Usuarios() {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [usuarios, setUsuarios] = useState();
  const [filter, setFilter] = useState("user")
  const [search, setSearch] = useState("")


  useEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/${filter}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setUsuarios( response.data))
        } catch (error) {
          console.error(
             error.message
          );
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [filter, search])
  );
 



  return (
    <View>
              <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() =>setFilter("user")}>
          <Text className='text-xl font-thin mx-auto'>Todos los usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() =>setFilter("admin/userban")}>
          <Text className='text-xl font-thin mx-auto'>Usarios inhabilitados</Text>
        </TouchableOpacity>

        <Text className='text-xl font-thin mx-auto'>Cantidad de usuarios: {usuarios?.length}</Text>

    <View>
      <FlatList
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={usuarios}
        renderItem={({ item }) => (
            <UserCard item={item}/>
        )}
      ></FlatList>
    </View>
    </View>
  );
}
