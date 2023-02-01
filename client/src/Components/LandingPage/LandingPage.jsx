import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { LandingButton } from "../Buttons/Buttons";
import { useFocusEffect } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/authentication";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../../Redux/Actions";

import AsyncStorage from "@react-native-async-storage/async-storage";

const LandingPage = ({ navigation }) => {
  const isLoggedIn = useSelector(store => store.isLoggedIn)
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.getIdToken().then(async (tkn) => {
        await AsyncStorage.setItem(
          "authorization",
          "Bearer " + tkn
        )
        dispatch(setIsLoggedIn(true));
        //No mover este console log de acá
        console.log("authorization", "Bearer " + tkn);
      }).catch((err) => {
        console.error("⚠️ Error -> 🚨 LANDING PAGE -> 🔔onAuthStateChanged: " + err.message);
      })
    } else {
      AsyncStorage.clear();
      dispatch(setIsLoggedIn(false));
    }
  });



  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <LandingButton onPress={() => navigation.navigate("Home")} />
      ) : (
        <LandingButton onPress={() => navigation.navigate("Welcome")} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A302E",
  },
});
export default LandingPage;
