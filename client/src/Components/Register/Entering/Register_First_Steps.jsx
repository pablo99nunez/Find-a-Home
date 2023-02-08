import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import States from "../States.json";
import Localities from "../Localities.json";
import validate from "../validate";


const { width } = Dimensions.get("screen")

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
      [clave]: validate.Register_First_Steps(clave, valor)
    });

  };
  const handleContinuar = () => {
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
    <View>
      <View className="h-screen flex items-center bg-[#FFC733]">
        <Text style={{ fontFamily: 'Roboto_300Light' }} className="w-auto mx-auto font-light text-4xl leading-auto items-center text-center mb-5">
          ¡Bienvenido/a {userInput.firstName[0].toUpperCase().concat(userInput.firstName.toLowerCase().substring(1))}
        </Text>
        <Text style={{ fontFamily: 'Roboto_300Light' }} className="w-11/12 mx-auto px-8 mb-5 text-xl leading-auto flex items-center text-center">
          Solo unos datos más y podrás comenzar:
        </Text>

        <View className="w-11/12 mt-[5%]">
          <Text style={{ fontFamily: 'Roboto_300Light' }} className="">Teléfono:</Text>
          <TextInput
            maxLength={15}
            className="bg-[#1E1E1E] text-[#7E7E7E] text-[18px] rounded-[11px] w-[100%] pl-4 mx-auto h-11"
            value={userInput.phone}
            placeholder={"011 555-5555"}
            placeholderTextColor="#ffffff50"
            onChangeText={(valor) => { handleChange("phone", valor) }}
          />
          <View className='h-5'>
            <Text style={{ fontFamily: 'Roboto_300Light' }} className='text-[#ed3232]'>{errors.phone}</Text>
          </View>
        </View>

        <View className="w-11/12 mt-[5%]">
          <Text style={{ fontFamily: 'Roboto_300Light' }} className="">Pais:</Text>
          <SelectList
            data={[{ key: "Argentina", value: "Argentina" }]}
            setSelected={(val) => setUserInput({ ...userInput, pais: val })}
            placeholder="Pais"
            search={false}
            boxStyles={{ backgroundColor: "#1E1E1E", width: '100%' }}
            inputStyles={{ color: "#7E7E7E", fontSize: 18 }}
            dropdownStyles={{ backgroundColor: "#2E2E2E" , 
            position: "absolute",
            top: width * 0.1,
            zIndex: 1,
            elevation: 1
          }}
          dropdownItemStyles={{ width: width }}
          dropdownTextStyles={{ color: "#6E6E6E", fontSize: 18 }}
          />
        </View>

        <View className="w-11/12 mt-[5%]" style={{ zIndex: -1,
                    elevation: -1 }}>
          <Text style={{ fontFamily: 'Roboto_300Light' }} className="">Provincia:</Text>
          <SelectList
            data={States}
            setSelected={(val) =>
              setUserInput({ ...userInput, provincia: val })
            }
            placeholder="Provincia"
            search={false}
            boxStyles={{ backgroundColor: "#1E1E1E", width: '100%' }}
            inputStyles={{ color: "#7E7E7E", fontSize: 18 }}
            dropdownStyles={{ backgroundColor: "#2E2E2E" , 
            position: "absolute",
            top: width * 0.1,
            zIndex: 1,
            elevation: 1
          }}
          dropdownItemStyles={{ width: width }}
            dropdownTextStyles={{ color: "#6E6E6E", fontSize: 18 }}
          />
        </View>

        <View className="w-11/12 my-[5%]" style={{ zIndex: -2,
                    elevation: -2 }}>
          <Text style={{ fontFamily: 'Roboto_300Light' }} className="">
            Departamento:
          </Text>
          <SelectList
            data={Localities.filter((ele) => ele.key == userInput.provincia)}
            setSelected={(value) =>
              setUserInput({ ...userInput, departamento: value })
            }
            placeholder="Departamento"
            // search={false}

            boxStyles={{ backgroundColor: "#1E1E1E", width: '100%' }}
            inputStyles={{ color: "#7E7E7E", fontSize: 18 }}
            dropdownStyles={{ backgroundColor: "#2E2E2E" , 
            position: "absolute",
            top: width * 0.1,
            zIndex: 1,
            elevation: 1
          }}
          dropdownItemStyles={{ width: width }}
            dropdownTextStyles={{ color: "#6E6E6E", fontSize: 18 }}
            search={false}
          />
        </View>
        {loading ? <TouchableOpacity
          onPress={() => { }}
        >
          <Text style={{ fontFamily: 'Roboto_300Light' }} className="text-3xl">
            Loading
          </Text>
        </TouchableOpacity>
          :
          <TouchableOpacity disabled={disable} className='flex flex-row justify-end w-11/12 mt-5' 
            style={{ zIndex: -3, elevation: -3 }}
            onPress={() => {
              handleContinuar()
            }}
          >
            <Text style={{ fontFamily: 'Roboto_300Light'}} className="text-3xl font-light ">
              {disable ? "Rellene los Datos" : "Continuar"}
            </Text>
          </TouchableOpacity>
        }
      </View>
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
