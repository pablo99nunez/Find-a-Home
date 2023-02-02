import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//¿¿Why you import  Keyboard Aware Scroll View??
import validate from "../validate";

export default function RegisterFirstSteps({ navigation, route }) {
  const { password, email, firstName, lastName } = route.params;
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    email,
    password,
    firstName,
    lastName,
    telefono: "",
    coordinate: {
      latitude: -35.51242,
      longitude: -58.51123,
    },
  });

  const [errors, setErrors] = useState({
    telefono: "Ingrese un telefono Válido",
  });
  const handleChange = (clave, valor) => {
    console.log(clave, valor);
    setUserInput({
      ...userInput,
      [clave]: valor,
    });
    setErrors({
      ...errors,
      [clave]: validate.Register_First_Steps(clave, valor),
    });
    const len = Object.entries(errors).length;
  };
  const handleContinuar = () => {
    setLoading(true);
    navigation.navigate("RegisterLastSteps", userInput);
    setLoading(false);
  };
  const disable = `${errors.telefono}`.length > 0;
  return (
    <View>
      <ScrollView>
        <View className="h-screen flex items-center bg-[#FFC733] ">
          <Text className="w-auto mx-auto font-light text-4xl leading-auto items-center text-center mb-5">
            ¡Bienvenida Florencia!
          </Text>
          <Text className="w-11/12 mx-auto px-8 mb-5 text-xl leading-auto flex items-center text-center">
            Solo unos datos más y podrás comenzar:
          </Text>

          <View className="w-11/12">
            <Text className="">Teléfono:</Text>
            <TextInput
              className="bg-[#1E1E1E] text-[#7E7E7E] text-[18px] rounded-[11px] w-[100%] pl-4 mx-auto h-11"
              value={userInput.telefono}
              placeholder={"011 555-5555"}
              placeholderTextColor="#ffffff50"
              onChangeText={(valor) => {
                handleChange("telefono", valor);
              }}
            />
            <View className="h-5 mt-1">
              <Text className="text-[#ed3232]">{errors.telefono}</Text>
            </View>
          </View>
          {/* ACA COORDENADAS */}
          <Text className="">{`lat: ${userInput.coordinate.latitude} long: ${userInput.coordinate.longitude}`}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterMap", { userInput, setUserInput });
            }}
          >
            <Text className="text-3xl">Seleccionar mis coordenadas</Text>
          </TouchableOpacity>
          {loading ? (
            <TouchableOpacity onPress={() => {}}>
              <Text className="text-3xl">Loading</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={disable}
              className="flex flex-row justify-end w-11/12 mt-5"
              onPress={() => {
                handleContinuar();
              }}
            >
              <Text className="text-3xl font-light ">
                {disable ? "Rellene los Datos" : "Continuar"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFC733",
  },
  icon: {
    width: 50,
    resizeMode: "contain",
  },
  text: {
    color: "#000",
    fontSize: 20,
  },
  next: {
    color: "#000",
    fontSize: 30,
  },
  textTitles: {
    color: "#000",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 55,
    margin: 10,
  },
  textSubTitles: {
    color: "#000",
    textAlign: "left",
    alignSelf: "flex-start",
    fontSize: 30,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    fontSize: 25,
    width: 350,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    margin: 10,
  },
  inputPicker: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    fontSize: 25,
    borderWidth: 1,
    borderColor: "gray",
    padding: 1,
  },
  divisionPanel: {
    width: "95%",
  },
});
