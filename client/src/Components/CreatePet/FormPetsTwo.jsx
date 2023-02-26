import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { validateBirthday, validateDesc, validateName } from "./validations";
import { Photos } from "./Photos";
import Select from "../Buttons/Select";

export default FormPetsTwo = ({ setCrear, crear, error, setError }) => {
  return (
    <ScrollView className="bg-[#d9d9d9] flex px-[7%]">
      <View>
        <Text className="text-2xl font-extralight mb-3">Estado del animal</Text>
        <View className="flex flex-row justify-center flex-wrap">
          <Select
            options={[
              "En busca de adopción",
              "Perdido",
              "Encontrado",
              "Transito",
            ]}
            state={crear.state}
            setState={(value) => setCrear({ ...crear, state: value })}
          ></Select>
        </View>
        <View className="h-5 mt-1">
          <Text className="text-[#ed3232]">{error.state}</Text>
        </View>

        <Photos name={crear.name} setCrear={setCrear} crear={crear} />
      </View>
    </ScrollView>
  );
};
