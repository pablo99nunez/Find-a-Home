import React, { useState } from "react";
import { ScrollView, Text, View, Image, Linking, TouchableOpacity } from "react-native";
import { ButtonYellow } from "../Buttons/Buttons";
import { acceptAdoption, PushNotifications } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL_IP } from "@env"
import axios from "axios";
import { auth } from '../../firebase/authentication';
import DialogInput from 'react-native-dialog-input';
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
  const [visible, setVisible] = React.useState(false);
  const [input, setInput] = React.useState('');



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
          if (typeof error.response !== "undefined")
          console.error("SolicitudPet.jsx: " + error.response.data.error)
          else
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
      dispatch(PushNotifications(pushToken, titleNotification, bodyNotification, email))
    } catch (error) {
      console.log("⚠️ Error -> 🚨 SolicitudPet -> 🔔 sendPushNotification " + error.message)
    }

  }
  async function confirmAdoption() {
    const newOwnerEmail = email;
    dispatch(acceptAdoption(petId, newOwnerEmail));
    sendPushNotification()
    setVisible(true)
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
        <Text className="my-5 mx-auto text-3xl" style={{ fontFamily: "Roboto_300Light" }}>
          {firstName[0].toUpperCase().concat(firstName.toLowerCase().substring(1))} {lastName[0].toUpperCase().concat(lastName.toLowerCase().substring(1))}
        </Text>
        <Text className="my-5 mx-auto text-xl" style={{ fontFamily: "Roboto_300Light" }}>{message}</Text>
      </View>
      <TouchableOpacity
        className="bg-[#25D366] w-2/3 self-center rounded-2xl py-4 mb-2.5 shadow-md flex flex-row justify-center"
        onPress={() =>
          handleContact().catch(() => {
            alert('Ha ocurrido un error');
          })
        }
      >
        <Image
          className="h-[100%] w-[20%]"
          resizeMode="contain"
          source={require("../../images/whatsapp.png")}

        />
        <Text className="text-center text-2xl" style={{ fontFamily: "Roboto_300Light" }}>Contacto</Text>
      </TouchableOpacity>

      <ButtonYellow
        text={"Aceptar Solicitud"}
        onPress={() => confirmAdoption()}
      />
      <DialogInput 
                isDialogVisible={visible}
                title={`Has aceptado la solicitud de ${firstName}`}
                message={"Puedes puntuarlo del 1-5?"}
                hintInput ={"1-5"}
                textInputProps={{maxLength: 1}}
                submitInput={ (inputText) => {
                    setInput(inputText),
                    setVisible(false);
                    alert('linea 130 agregar dispatch de rating')
                    navigation.navigate('UserDetail')
                }}
                closeDialog={() => setVisible(false)}>
            </DialogInput>
    </ScrollView>
  );
};

export default SolicitudPet;
