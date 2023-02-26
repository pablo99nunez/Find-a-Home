import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

type Props = {
  options: [string];
  labels: [string];
  active?: null | number;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export default function Select({
  options,
  labels,
  active,
  state,
  setState,
}: Props) {
  if (!labels) labels = options;

  useEffect(() => {
    active && setState(options[active]);
  }, []);
  return (
    <TouchableOpacity
      className="flex flex-1 flex-wrap flex-row items-center justify-center "
      onPress={() => console.log("Press")}
    >
      {options.map((e, i) => {
        return (
          <Option
            setState={setState}
            state={state}
            value={e}
            label={labels[i]}
            key={e}
          ></Option>
        );
      })}
    </TouchableOpacity>
  );
}

type OptionProps = {
  value: string;
  label: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

export function Option({ value, state, setState, label }: OptionProps) {
  return (
    <View
      onTouchEnd={() => {
        setState(value);
      }}
      className={`self-start rounded-full ${
        state == value ? "bg-pink" : "bg-grey-300"
      } p-3 ml-2 mt-2`}
    >
      <Text className={state === value && "text-white"}>{label}</Text>
    </View>
  );
}
