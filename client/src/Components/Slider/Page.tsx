import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { Children, useEffect } from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type PageProps = {
  title: string;
  index: number;
  children?: JSX.Element;
  translateX: SharedValue<number>;
};
const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("screen");
export default function Page({ title, index, translateX }: PageProps) {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [index - 2, index - 1, index, index + 1],
      [0, 0.4, 2.5, 2.5],
      Extrapolation.CLAMP
    );
    console.log(
      "circle" +
        index +
        ":" +
        "[" +
        (index - 1) +
        "," +
        index +
        "," +
        (index + 1) +
        "] scale:" +
        scale +
        " x:" +
        translateX.value
    );

    return {
      transform: [{ scale: scale }],
      borderRadius: PAGE_HEIGHT / 2,
    };
  });
  const colors = {
    0: "rgba(255,0,0,0.8)",
    1: "rgba(0,0,255,0.8)",
    2: "rgba(0,255,0,0.8)",
    3: "rgba(255,255,0,0.8)",
  };

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          height: PAGE_HEIGHT,
          width: PAGE_HEIGHT,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors[index],
        },
        rStyle,
      ]}
    >
      <View className="h-screen w-screen bg-pink flex justify-center items-center opacity-20">
        <Text
          style={{
            fontSize: 72,
          }}
        >
          {title}
        </Text>
      </View>
    </Animated.View>
  );
}
export { PAGE_WIDTH };
