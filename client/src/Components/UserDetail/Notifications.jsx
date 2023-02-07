import React from "react";
import { View, FlatList, Text, Image, Dimensions } from "react-native";
import { useSelector } from "react-redux";

export const Notifications = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const { width, height } = Dimensions.get("screen");

  return (
    <View
      style={{ height: height * 0.98, width: width }}
      className="bg-[#d9d9d9] "
    >
      <FlatList
        keyExtractor={(item) => item.title}
        data={currentUser.Notifications}
        renderItem={({ item }) => (
          <View className="bg-[#AB4E68] flex flex-row mx-[3%] my-[2%] p-[3%] rounded-xl items-center">
            <Image
              className="h-[100%] w-[15%] m-2"
              resizeMode="contain"
              source={require("../../images/FindAHome.png")}
            />
            <View>
              <Text className="text-[#d9d9d9] font-light w-[60%]">
                {item.title}
              </Text>
              <Text className="text-[#d9d9d9] font-extralight text-sm w-[60%]">
                {item.body}
              </Text>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};
