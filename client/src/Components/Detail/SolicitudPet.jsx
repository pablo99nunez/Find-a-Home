import React, { useState } from "react";
import { ScrollView, Text, View, Image, Linking, TouchableOpacity } from "react-native";
import { ButtonYellow } from "../Buttons/Buttons";
import { acceptAdoption, PushNotifications } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL_IP } from "@env"
import axios from "axios";
import { auth } from '../../firebase/authentication';
// import * as Linking from 'expo-linking'
const SolicitudPet = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const dispatch = useDispatch();
  const { email, profilePic, message, phone, firstName, lastName } =
    route.params.item

  const userRequsting = { email, profilePic, message, phone, firstName, lastName }
  const [pushToken, setPushToken] = useState("")


  const petId = route.params.petId;
  const name = route.params.name;



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

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios.get(`${BASE_URL_IP}/user?email=${email}`, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            }
          })
            .then(response => setPushToken(response.data[0].pushToken))

        } catch (error) {
          console.error("⚠️ Error -> 🚨 profileOthers -> 🔔 gettingUser: " + error.message)
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  )


  async function sendPushNotification() {
    try {
      // Usamos firebase para obtener el token de android o ios
      // console.log("This is the Push Token:", getPushToken)
      // console.log(pushToken)

      const titleNotification = `¡Felicidades ${firstName}! Te han aceptado en la solicitud de adopción de mascota.`;
      const bodyNotification = `${currentUser.firstName} cree que eres la mejor opción para darle un nuevo hogar a ${name}.`


      // Esta action hace dispatch del token, el mensaje, y el titulo
      // de la notificacion que enviaremos al backend
      dispatch(PushNotifications(pushToken, titleNotification, bodyNotification))
    } catch (error) {
      console.log("⚠️ Error -> 🚨 SolicitudPet -> 🔔 sendPushNotification " + error.message)
    }

  }
  async function confirmAdoption() {
    const newOwnerEmail = email;
    dispatch(acceptAdoption(petId, newOwnerEmail));
    sendPushNotification()
  }

  return (
    <ScrollView className="flex bg-[#d9d9d9]">
      <TouchableOpacity onPress={() => navigation.navigate('Profile', userRequsting)}>
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
