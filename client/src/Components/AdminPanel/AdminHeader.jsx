import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

export default function AdminHeader({ navigation }) {
  console.log(navigation);
  return (
    <View className="flex flex-row justify-between items-center mt-[10%] mb-[5%] pl-[5%] pr-[5%]">
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          className="w-14 h-14 rounded-full"
          resizeMode={"contain"}
          source={require("../../images/FindAHome.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Image
          className="w-14 h-14 rounded-full"
          resizeMode={"contain"}
          source={require("../../images/buttonDonation.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigation.navigate("Reports")}>
        <Image
          className="w-14 h-14 rounded-full"
          resizeMode={"contain"}
          source={require("../../images/profilePic.jpg")}
        />
      </TouchableOpacity>
    </View>
  );
}
