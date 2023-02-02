import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";

export default function Reports() {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [reports, setReports] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/admin/reportPets`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setReports({ ...response.data[0] }));
        } catch (error) {
          console.error(
            "⚠️ Error -> 🚨 profileOthers -> 🔔 gettingUser: " + error.message
          );
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );
  console.log(reports);
  return (
    <View>
      <FlatList
        numColumns={2}
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={reports}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      ></FlatList>
    </View>
  );
}
