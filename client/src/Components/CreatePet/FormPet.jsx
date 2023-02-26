import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import DateTimePicker, {
  AndroidNativeProps,
} from "@react-native-community/datetimepicker";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { validateBirthday, validateDesc, validateName } from "./validations";
import { formatDate } from "./utils";
import Select from "../Buttons/Select";
import Size from "../Size/Size";
import { Photos } from "./Photos";

export default FormPet = ({ setCrear, crear, error, setError }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <ScrollView className="bg-grey flex px-[7%] gap-2">
      <View>
        <Text className="text-2xl font-extralight mb-3">Nombre</Text>
        <TextInput
          className={`h-11 bg-grey-800 text-white rounded-md px-3 font-light ${
            error.name && "border border-[red]"
          }`}
          placeholder="Nombre de tu mascota"
          placeholderTextColor="#ececec"
          autoCapitalize="none"
          value={crear.name}
          maxLength={15}
          onBlur={() => {
            if (crear.name.length > 0) {
              const wrongName = validateName(crear.name);
              if (wrongName)
                setError({
                  ...error,
                  name: "El nombre no puede contener caracteres especiales",
                });
              else {
                setError({ ...error, name: "" });
              }
            } else {
              setError({
                ...error,
                name: "El nombre no puede estar vacio",
              });
            }
          }}
          onChangeText={(text) => setCrear({ ...crear, name: text })}
        />
        {error.name && (
          <View className="h-10 mt-1">
            <Text className="text-[#ed3232]">{error.name}</Text>
          </View>
        )}
      </View>

      <View>
        <Text className="text-2xl font-extralight mb-3">Descripción</Text>
        <TextInput
          className={`"h-20 bg-grey-800 text-white rounded-md px-3 font-light ${
            error.description && "border border-[red]"
          }`}
          multiline={true}
          numberOfLines={4}
          placeholder="Describe a tu mascota...
          Necesita alguna vacúna o atencion veterinaria?"
          placeholderTextColor="#ececec"
          autoCapitalize="none"
          value={crear.description}
          maxLength={140}
          onChangeText={(text) => setCrear({ ...crear, description: text })}
          onBlur={() => {
            const wrongDesc = validateDesc(crear.description);
            if (wrongDesc)
              setError({
                ...error,
                description: "Por favor agrega una descripcion",
              });
            else {
              setError({ ...error, description: "" });
            }
          }}
        />
        {error.description && (
          <View className="h-10 mt-1">
            <Text className="text-[#ed3232]">{error.description}</Text>
          </View>
        )}
      </View>

      <View>
        <Text className="text-2xl font-extralight mb-3">
          Fecha de Nacimiento
        </Text>
        <TouchableOpacity
          className="flex flex-row justify-between items-center px-4"
          onPressOut={() => setShowDatePicker(!showDatePicker)}
        >
          <Text className="text-xl">
            {crear.birthday || "Selecciona una fecha: "}
          </Text>
          <View className="bg-yellow rounded p-2 shadow">
            <MaterialCommunityIcons
              name={crear.birthday ? "calendar-refresh" : "calendar-question"}
              size={32}
              color="black"
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            maximumDate={new Date()}
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (event.type == "set") {
                setDate(date);
                setCrear({
                  ...crear,
                  birthday: formatDate(date),
                });
              }
            }}
          ></DateTimePicker>
        )}
      </View>
      <View>
        <Text className="text-2xl font-extralight mb-3">Especie</Text>
        <View className="flex flex-1 flex-row justify-center">
          <Select
            options={["Perro", "Gato", "Otro"]}
            state={crear.specie}
            setState={(value) => setCrear({ ...crear, specie: value })}
          ></Select>
        </View>

        <View className="h-5 mt-1">
          <Text className="text-[#ed3232]">{error.specie}</Text>
        </View>
      </View>

      <View>
        <Text className="text-2xl font-extralight">Tamaño</Text>
        <Size
          state={crear.size}
          setState={(value) => setCrear({ ...crear, size: value })}
        ></Size>
        <View className="h-5 mt-1">
          <Text className="text-[#ed3232]">{error.size}</Text>
        </View>
      </View>
      <View>
        <Text className="text-2xl font-extralight mb-3">Estado del animal</Text>
        <View className="flex flex-row justify-center flex-wrap">
          <Select
            options={["Adoptable", "Lost", "Found"]}
            labels={["En busca de adopción", "Perdido", "Encontrado"]}
            state={crear.state}
            setState={(value) => setCrear({ ...crear, state: value })}
          ></Select>
        </View>
        <View className="h-5 mt-1">
          <Text className="text-[#ed3232]">{error.state}</Text>
        </View>

        <Photos
          photos={crear.photos}
          setPhotos={(value) => setCrear({ ...crear, photos: value })}
        />
      </View>
    </ScrollView>
  );
};
