import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialsIcon } from "@expo/vector-icons";

export const Header = () => {
  return (
    <View style={styles.header}>
      {/*icon for the menu */}
      <View>
        <Text style={styles.headerText}>Nav Bar</Text>
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
});
