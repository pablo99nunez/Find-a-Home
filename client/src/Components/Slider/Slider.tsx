import { styled } from "nativewind";

import React, { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
  Text,
  NativeTouchEvent,
} from "react-native";
import Dots from "../Dots/Dots";
import Page, { PAGE_WIDTH } from "./Page";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

type Props = {
  children: [JSX.Element];
  contrast: (x: boolean) => void;
  whereContrast: [number];
};
const titles = ["HI", "HOW", "ARE"];
type ContextType = {
  x: number;
};

const MAX_TRANSLATE_X = -PAGE_WIDTH * (titles.length - 1);
export default function Slider({ children, contrast, whereContrast }: Props) {
  const translateX = useSharedValue(0);
  const clampTranslateX = useDerivedValue(() => {
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X);
  });
  const pageNumber = useDerivedValue(() => {
    return clampTranslateX.value / -PAGE_WIDTH;
  });
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampTranslateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
      console.log(clampTranslateX.value);
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <StyledView className={"relative h-full"} testID="view">
      {/*  <Text className="f-[30px] z-[300] absolute color-black top-20">
        {page}
      </Text> */}
      <View className="flex-1 bg-white-500 h-full">
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            className={"flex-1 flex-row justify-center align-center"}
          >
            {titles.map((e, i) => {
              return (
                <Page
                  key={i.toString()}
                  index={i}
                  title={e}
                  translateX={pageNumber}
                ></Page>
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </View>
      {/* <Dots steps={children.length} page={page}></Dots> */}
    </StyledView>
  );
}
