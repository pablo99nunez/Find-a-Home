import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { ButtonYellow } from "../../Buttons/Buttons";
import { StyleSheet } from "react-native";
import validate from "../validate";

export default function RegistrationScreen({ navigation }) {
  //crea estado local
  const [userInputs, setUserInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  //Ya tienes cuenta? click para logearte:
  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const handleChange = (clave, valor) => {
    console.log(clave, valor);
   setUserInputs({
      ...userInputs,
      [clave]: valor,
    }); 
     setErrors({
        ...errors,
        [clave]: validate.registrationScreen(clave,valor)
     }); 
    const len = Object.entries(errors).length;
  };
  const handleContinuar = () =>{
    
    navigation.navigate("RegisterFirstSteps", userInputs)
  }

  const disable = `${userInputs.firstName}`.length===0 ||
  `${userInputs.lastName}`.length===0 ||
  `${userInputs.email}`.length===0 ||
  `${userInputs.password}`.length===0 ||
  `${errors.firstName}${errors.lastName}${errors.email}${errors.password}`.length > 0

  //#endregion de validaciones

  return (
    <View
      style={styles.container}
      className="flex w-[100%] bg-[#3A302E] items-center"
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        className="w-[90%]"
      >
        <Image
          style={styles.logo}
          source={require("../../../images/FindAHome.png")}
        />
        <TextInput
          className="h-11 w-[100%] bg-white rounded-md my-3 pl-3"
          placeholder="Nombre"
          placeholderTextColor="#aaaaaa"
          onChangeText={(valor)=>{handleChange("firstName",valor)}}
          value={userInputs.firstName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
         <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{errors.firstName}</Text>
          </View>
        <TextInput
          className="h-11 w-[100%] bg-white rounded-md my-3 pl-3"
          placeholder="Apellido"
          placeholderTextColor="#aaaaaa"
          onChangeText={(valor)=>{handleChange("lastName",valor)}}
          value={userInputs.lastName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{errors.lastName}</Text>
          </View>
        <TextInput
          className="h-11 w-[100%] bg-white rounded-md my-3 pl-3"
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(valor)=>{handleChange("email",valor)}}
          value={userInputs.email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{errors.email}</Text>
          </View>
        <TextInput
          className="h-11 w-[100%] bg-white rounded-md my-3 pl-3"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Contraseña"
          onChangeText={(valor)=>{handleChange("password",valor)}}
          value={userInputs.password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{errors.password}</Text>
          </View>
        <View className="my-3">
          <ButtonYellow 
            onPress={() => handleContinuar()}
            text={disable ? "Rellene los datos":"Continuar"}
            deshabilitar={disable}
          />
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Ya tiene una cuenta?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Logearme
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    height: 140,
    width: 155,
    alignSelf: "center",
    padding: 50,
    margin: 30,
  },
});
