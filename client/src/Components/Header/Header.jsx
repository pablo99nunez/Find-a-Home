import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Header/Nav</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
