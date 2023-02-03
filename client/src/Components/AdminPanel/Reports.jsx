import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";
import ReportCard from "./ReportCard";

export default function Reports() {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [reports, setReports] = useState();
  const [filter, setFilter] = useState("reportPets")

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/admin/${filter}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setReports(response.data))
        } catch (error) {
          console.error(
             error.message
          );
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [filter])
  );

 
  return (
    <View>
              <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() =>setFilter("reportPets")}>
          <Text className='text-xl font-thin mx-auto'>Mascotas reportadas</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() =>setFilter("reportUsers")}>
          <Text className='text-xl font-thin mx-auto'>Usuarios reportados</Text>
        </TouchableOpacity>
    <View>
      <FlatList
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={reports}
        renderItem={({ item }) => (
            <ReportCard item={item}/>
        )}
      ></FlatList>
    </View>
    </View>
  );
}
