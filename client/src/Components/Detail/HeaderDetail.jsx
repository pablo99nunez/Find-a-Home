import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
} from "react-native";

export const HeaderDetail = (props) => {
  const { onPress, days } = props;
  //this function received an integer of the days and return a formatted string in spanish.
  //If is only a day should return '1 día'.
  //If is more than a month should return 'x meses', etc.
  const getTime = (days) => {
    if (days === 1) {
      return "1 día";
    } else if (days < 30) {
      return `${days} días`;
    } else if (days < 365) {
      const months = Math.floor(days / 30);
      return `${months} ${months === 1 ? "mes" : "meses"}`;
    } else {
      const years = Math.floor(days / 365);
      return `${years} ${years === 1 ? "año" : "años"}`;
    }
  };

  return (
    <View className="flex flex-row justify-between pt-[10%] w-screen absolute top-3 z-[300]">
      <TouchableOpacity onPress={onPress}>
        <Image
          className="ml-3 w-12 h-11"
          source={require("../../images/FindAHome.png")}
        />
      </TouchableOpacity>
      <ImageBackground
        source={require("../../images/Banderin.png")}
        className="w-36 h-11"
      >
        <Text
          style={{
            fontFamily: "Roboto_300Light",
            fontWeight: "bold",
            textAlign: "right",
            marginRight: 15,
            marginTop: 5,
          }}
        >
          {getTime(days)}
        </Text>
        <Text
          style={{
            fontFamily: "Roboto_300Light",
            textAlign: "right",
            marginRight: 12,
          }}
        >
          buscando hogar
        </Text>
      </ImageBackground>
    </View>
  );
};
