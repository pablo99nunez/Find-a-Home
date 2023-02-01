import React from "react";
import { View, StyleSheet } from "react-native";
import { LandingButton } from "../Buttons/Buttons";

import { useSelector } from "react-redux";

const LandingPage = ({ navigation }) => {
  const isLoggedIn = useSelector(store => store.isLoggedIn)
  
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
