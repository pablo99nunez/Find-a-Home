import React from "react";
import { View, StyleSheet } from "react-native";
import { LandingButton } from "../Buttons/Buttons";

import { useSelector } from "react-redux";
import GoogleButton from "../Buttons/GoogleAuth";

const LandingPage = ({ navigation }) => {
  const isLoggedIn = useSelector(store => store.isLoggedIn)

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <GoogleButton />
          <LandingButton onPress={() => navigation.navigate("Welcome")} />
        </>
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
