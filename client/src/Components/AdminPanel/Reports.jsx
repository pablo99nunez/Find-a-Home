import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";
import AdminHeader from "./AdminHeader";
import { ScrollView } from "react-native-gesture-handler";
import ReportCard from "./ReportCard";

export default function Reports() {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [reports, setReports] = useState();

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
            .then((response) => setReports(response.data))
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

  // console.log("reportes", reports )
  return (
    <View>
      <View>
        <AdminHeader/>
      </View>
    <View>
      <FlatList
        numColumns={2}
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
