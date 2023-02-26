import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import activeIcon from "../../images/perro_rosa.png";
import inactiveIcon from "../../images/perro_negro.png";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Size({ state, setState }: Props) {
  return (
    <View className="flex flex-row items-end justify-center">
      <View onTouchEnd={() => setState("small")}>
        <Image
          source={state === "small" ? activeIcon : inactiveIcon}
          className="w-10 h-10 mx-3"
        />
      </View>
      <View onTouchEnd={() => setState("medium")}>
        <Image
          source={state === "medium" ? activeIcon : inactiveIcon}
          className="w-12 h-12 mx-3"
        />
      </View>
      <View onTouchEnd={() => setState("large")}>
        <Image
          source={state === "large" ? activeIcon : inactiveIcon}
          className="w-14 h-14 mx-3"
        />
      </View>
    </View>
  );
}
