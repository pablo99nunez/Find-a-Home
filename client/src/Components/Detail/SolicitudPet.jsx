import React from "react";
import { ScrollView, Text, View, Image, Linking, TouchableOpacity } from "react-native";
import { ButtonYellow } from "../Buttons/Buttons";
import { acceptAdoption } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
// import * as Linking from 'expo-linking'
const SolicitudPet = ({navigation, route}) => {
  const dispatch = useDispatch();
  const { email, profilePic, message, phone, firstName, lastName } =
    route.params.item

  const userRequsting = { email, profilePic, message, phone, firstName, lastName }

  const petId = route.params.petId;
  const handleContact = async () => {
    if (phone) {
      const url = `http://wa.me/54${phone}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert(`Don't know how to open this URL: ${url}`);
      }
    } else {
      alert("ups el usuario no ha dejado su informacion de contacto");
    }
  };

  async function confirmAdoption() {
    const newOwnerEmail = email;
    dispatch(acceptAdoption(petId, newOwnerEmail));
  }

  return (
    <ScrollView className="flex">
      <TouchableOpacity onPress={()=> navigation.navigate('Profile', userRequsting)}>
        <Image
          style={{ width: 100, height: 100 }}
          className="rounded-full mx-auto mt-6"
          source={{ uri: profilePic }}
        />
      </TouchableOpacity> 
     
      <View>
        <Text className="my-5 mx-auto text-3xl">{firstName} {lastName}</Text>
        <Text className="my-5 mx-auto text-xl">{message}</Text>
      </View>
      <ButtonYellow
        text={"Contacto"}
        onPress={() =>
          handleContact().catch(() => {
            alert('Ha ocurrido un error');
          })
        }
      />
     
      <ButtonYellow
        text={"Aceptar Solicitud"}
        onPress={() => confirmAdoption()}
      />
    </ScrollView>
  );
};

export default SolicitudPet;
