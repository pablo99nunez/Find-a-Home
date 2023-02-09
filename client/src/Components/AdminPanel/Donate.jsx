import { View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import DonateCard from "./DonateCard";
import { useFocusEffect } from "@react-navigation/native";

const {width, height} = Dimensions.get("screen")

export default function Donate({ navigation }) {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [donadores, setDonadores] = useState();

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
          .get(`${BASE_URL_IP}/admin/donaciones`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setDonadores( response.data))
        } catch (error) {
          console.error(error.message);
        }
      }
      evitaReturnDelUseEffect();
    }, [])
  );

  return (
    <View>
    <View>
      <FlatList
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={donadores}
        style={{height: height * 0.88}}
        renderItem={({ item }) => (
            <DonateCard item={item} navigation={navigation}/>
        )}
      ></FlatList>
    </View>
    </View>
  );
}