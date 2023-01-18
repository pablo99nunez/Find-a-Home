import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";

export const Header = ({ navigation }) => {
  const openProfile = () => {};
  const openHome = () => {};
  const openMenu = () => {
    /*  navigation.openDrawer(); */
  };

  return (
    <View style={styles.header}>
      <AntDesign
        name="profile"
        size={25}
        onPress={openProfile}
        style={styles.iconLeft}
      />
      <Ionicons
        name="logo-android"
        size={25}
        onPress={openHome}
        style={styles.iconCenter}
      />
      <MaterialIcons
        name="menu"
        size={25}
        onPress={openMenu}
        style={styles.iconRight}
      />

      <View>
        <Text style={styles.headerText}>Botón o Logo?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    letterSpacing: 3,
  },
  iconRight: {
    position: "absolute",
    right: 16,
  },
  iconLeft: {
    position: "absolute",
    left: 16,
  },
  iconCenter: {
    position: "relative",
    justifyContent: "center",
  },
});
