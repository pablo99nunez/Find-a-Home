import React, { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//¿¿Why you import  Keyboard Aware Scroll View??

import { SelectList } from "react-native-dropdown-select-list";
import States from "../States.json";
import Localities from "../Localities.json";

import validate from "../validate";

export default function RegisterFirstSteps({ navigation , route}) {
  const {password, email, firstName, lastName} = route.params
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState({
    email,
    password,
    firstName,
    lastName,
    phone: "",
    pais: "",
    provincia: "",
    departamento: "",
  });

  const [errors, setErrors] = useState({
    phone: "Ingrese un telefono Válido",
  });
  const handleChange = (clave, valor) => {

   setUserInput({
      ...userInput,
      [clave]: valor,
    }); 
     setErrors({
        ...errors,
        [clave]: validate.Register_First_Steps(clave,valor)
     }); 
    const len = Object.entries(errors).length;
  };
const handleContinuar = () =>{
  setLoading(true)
  navigation.navigate("RegisterLastSteps", userInput)
  setLoading(false)
}
const disable = `${userInput.phone}`.length === 0 ||
`${userInput.pais}`.length === 0 ||
`${userInput.provincia}`.length === 0 ||
`${userInput.departamento}`.length === 0 ||
`${errors.phone}`.length > 0
  return (
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
            maxLength={15}
            className="bg-[#1E1E1E] text-[#7E7E7E] text-[18px] rounded-[11px] w-[100%] pl-4 mx-auto h-11"
            value={userInput.phone}
            placeholder={"011 555-5555"}
            placeholderTextColor="#ffffff50"
            onChangeText={(valor)=>{handleChange("phone",valor)}}
          />
          <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{errors.phone}</Text>
          </View>
        </View>

        <View className="w-11/12">
          <Text className="">Pais:</Text>
          <SelectList
            data={[{ key: "Argentina", value: "Argentina" }]}
            setSelected={(val) => setUserInput({ ...userInput, pais: val })}
            placeholder="Pais"
            search={false}
            boxStyles={{ backgroundColor: "#1E1E1E", width: '100%'}}
            inputStyles={{ color: "#7E7E7E", fontSize: 18 }}
            dropdownStyles={{ backgroundColor: "#2E2E2E" }}
            dropdownTextStyles={{ color: "#6E6E6E", fontSize: 18 }}
          />
        </View>

        <View className="w-11/12">
          <Text className="">Provincia:</Text>
          <SelectList
            data={States}
            setSelected={(val) =>
              setUserInput({ ...userInput, provincia: val })
            }
            placeholder="Provincia"
            search={false}
            boxStyles={{ backgroundColor: "#1E1E1E", width: '100%'}}
            inputStyles={{ color: "#7E7E7E", fontSize: 18 }}
            dropdownStyles={{ backgroundColor: "#2E2E2E" }}
            dropdownTextStyles={{ color: "#6E6E6E", fontSize: 18 }}
          />
        </View>

        <View className="w-11/12">
          <Text className="">
            Departamento:
          </Text>
          <SelectList
            data={Localities.filter((ele) => ele.key == userInput.provincia)}
            setSelected={(value) =>
              setUserInput({ ...userInput, departamento: value })
            }
            placeholder="Departamento"
            // search={false}
            boxStyles={{ backgroundColor: "#1E1E1E",width: '100%'}}
            inputStyles={{ color: "#7E7E7E", fontSize: 18 }}
            dropdownStyles={{ backgroundColor: "#2E2E2E" }}
            dropdownTextStyles={{ color: "#6E6E6E", fontSize: 18 }}
          />
        </View>
     {loading ? <TouchableOpacity
        onPress={() => {}}
      >
        <Text className="text-3xl">
          Loading
        </Text>
      </TouchableOpacity>
    :  
    <TouchableOpacity disabled={disable} className='flex flex-row justify-end w-11/12 mt-5'
        onPress={() => {
          handleContinuar()
        }}
      >
        <Text className="text-3xl font-light ">
          {disable ? "Rellene los Datos" : "Continuar" }
        </Text>
      </TouchableOpacity>
    }
      </View>
    </ScrollView>
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
