import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";
import ReportCard from "./ReportCard";

export default function ReportsUsers() {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [reports, setReports] = useState();

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/admin/reportUsers`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setReports(...response.data))
            // .then((response) => setReports([...reports, response.data]));
        } catch (error) {
          console.error(
             error.message
          );
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );
  console.log(reports)

 
  return (
    <View>
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
