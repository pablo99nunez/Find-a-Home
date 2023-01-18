import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from "react-native";

export default function Detail({ route, navigation }) {
  const { profilePic } = route.params;
  return (
    <View>
      <Image
        style={{ width: 300, height: 300, margin: 35 }}
        source={{ uri: profilePic }}
      />
    </View>
  );
}
