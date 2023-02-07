import React, { useState } from "react";
import { ScrollView, Text, View, TextInput, Modal, Image, Linking, Animated, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { ButtonYellow } from "../Buttons/Buttons";
import { acceptAdoption, PushNotifications, reviewAndRating } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL_IP } from "@env"
import axios from "axios";
import { auth } from '../../firebase/authentication';
import DialogInput from 'react-native-dialog-input';
// import * as Linking from 'expo-linking'

const {width, height} = Dimensions.get("screen")

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
  const [rating, setRating] = React.useState(0)
  const [input, setInput] = React.useState('');

  const [errors, setErrors] = useState({
    rating: "Ingrese un rating entre 1 y 5",
  });

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

  async function giveRatingAndReview() {
    const newOwnerEmail = email
    setRating(rating),
    setInput(input),
    setVisible(false);
    dispatch(reviewAndRating(newOwnerEmail, rating, input))
  }

  async function confirmAdoption() {
    const newOwnerEmail = email;
    dispatch(acceptAdoption(petId, newOwnerEmail));
    sendPushNotification()
  }

  const disable = `${rating}` < 1 || `${rating}` > 5 || `${rating.length}`=== 0 || `${input.length}` === 0

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
        onPress={() => setVisible(true)}
      />

      {/* <DialogInput 
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
            </DialogInput> */}

        <Modal transparent visible={visible} animationType="slide">
          <SafeAreaView style={{backgroundColor: 'rgba(217,217,217,0.7)', height: height}}>
            <Animated.View style={{height: height * 0.55}} className="rounded-3xl bg-[#FFC733] w-[90%] mx-[5%] mt-[40%]">
              <View style={{padding: width * 0.05}}>
                <Text style={{ fontFamily: "Roboto_300Light", marginVertical: width * 0.03}} className="text-xl">Da una puntuacion a este usuario</Text>
                <TextInput
                  value={rating}
                  keyboardType="numeric"
                  maxLength={1}
                  placeholder="Puntuación entre 1 y 5"
                  className="h-[12%] bg-[#D9D9D9] rounded-md text-[#717171] text-center"
                  style={{ fontFamily: "Roboto_300Light", zIndex: -1, elevation: -1}}
                  onChangeText={(text) => text <= 5 && text >= 1 ? setRating(text) : setRating("")}
                />
                <Text style={{ fontFamily: "Roboto_300Light", marginVertical: width * 0.03}} className="text-xl">Dale una reseña a este usuario</Text>
                <TextInput
                  value={input}
                  maxLength={100}
                  placeholder="Reseña"
                  fontFamily="Roboto_300Light"
                  className="h-[12%] bg-[#D9D9D9] rounded-md text-[#717171] text-center"
                  style={{ fontFamily: "Roboto_300Light", zIndex: -1, elevation: -1}}
                  onChangeText={(text) => setInput(text)}
                />
                <Text style={{ fontFamily: "Roboto_300Light", marginTop: width * 0.03}} className="text-2xl text-center text-[#ff0000]">¿Estás seguro de dar en adopción esta mascota a este usuario?</Text>
                <Text style={{ fontFamily: "Roboto_300Light", marginBottom: width * 0.03}} className="text-xl text-center">Si es así apretá el boton de enviar, en caso contrario apretá en cerrar</Text>
                <View className="flex flex-row justify-between">
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Text style={{ fontFamily: "Roboto_300Light", paddingVertical: width * 0.03, width: width * 0.35 }} className="bg-[#AB4E68] text-[#d9d9d9] rounded-xl text-center text-xl">Cerrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  disabled={disable} onPress={() => {
                    giveRatingAndReview()
                    confirmAdoption()
                    navigation.navigate('UserDetail')
                  }}>
                    <Text style={{ fontFamily: "Roboto_300Light", paddingVertical: width * 0.03, width: width * 0.35 }} className="bg-[#AB4E68] text-[#d9d9d9] rounded-xl text-center text-xl">Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

export default SolicitudPet;
