import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
type Props = {
  steps: number;
  page: number;
};

export default function Dots({ steps, page }: Props) {
  return (
    <StyledView className="flex-row gap-x-1.5 w-full absolute justify-center bottom-10 z-[100]">
      {[...Array(steps)].map((e, i) => {
        return (
          <StyledView
            className={`w-3 aspect-square ${
              i == Math.round(page)
                ? "bg-pink border border-yellow"
                : "bg-grey-100"
            } rounded-full`}
            key={"dot-" + i}
          ></StyledView>
        );
      })}
    </StyledView>
  );
}
