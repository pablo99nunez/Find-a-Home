import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { ButtonYellow } from "../Buttons/Buttons";
import axios from "axios";
import { BASE_URL_IP } from "@env";

import { useFocusEffect } from "@react-navigation/native";
import { PushNotifications } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";

const BottomView = ({ petId, auth, email, petName }) => {
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [sent, setSent] = useState(false);
  const [pushToken, setPushToken] = useState("");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const [message, setMessage] = useState("");

  //Push Notifications
  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/user?email=${email}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setPushToken(response.data[0].pushToken));
        } catch (error) {
          //sino tira error como invitado al ver un pet
          if (isLoggedIn) {
            if (typeof error.response !== "undefined")
              console.error(error, error.response.data.error);
            else
              console.error(
                "⚠️ Error -> 🚨 profileOthers -> 🔔 gettingUser: " +
                  error.message
              );
          }
        }
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );

  async function sendPushNotification(message) {
    try {
      // Usamos firebase para obtener el token de android o ios

      const titleNotification = `¡Felicidades! ${petName} Ha recibido una solicitud de adopción de ${currentUser.firstName} `;
      const bodyNotification = `${message}`;

      // Esta action hace dispatch del token, el mensaje, y el titulo
      // de la notificacion que enviaremos al backend
      dispatch(
        PushNotifications(pushToken, titleNotification, bodyNotification, email)
      );
    } catch (error) {
      console.log(
        "⚠️ Error -> 🚨 SolicitudPet -> 🔔 sendPushNotification " +
          error.message
      );
    }
  }
  //Ends Push Notifications

  async function AdoptionRequest() {
    const data = { message, petID: petId };
    try {
      const response = await axios
        .put(`${BASE_URL_IP}/pet/profile/solicitud`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          sendPushNotification(message);
        })
        .then((response) => {
          setSent(true);
        });
    } catch (error) {
      if (typeof error.response !== "undefined")
        console.error(error.response.data);
      else
        console.error(
          "⚠️ Error -> 🚨 BottomView -> 🔔 AdoptionRequest: " + error.message
        );
    }
  }
  // renders
  return (
    <View>
      {!sent ? (
        <View>
          <Text
            className="text-center text-3xl my-2"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            Nueva solicitud
          </Text>
          <BottomSheetTextInput
            style={styles.input}
            multiline
            placeholder="Cuéntanos un poco sobre ti y por qué te gustaría adoptar a esta mascota"
            placeholderTextColor={"#717171"}
            onChangeText={(text) => setMessage(text)}
          />
          <Text
            className="text-[#717171] text-center text-xs mb-4"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            Tus datos de contacto serán {"\n"}compartidos con el dueño
          </Text>
          <ButtonYellow
            text="Enviar Solicitud"
            onPress={() => AdoptionRequest()}
          />
        </View>
      ) : (
        <View>
          <BottomSheetView>
            <Text className="text-2xl text-center my-9">
              ¡Solicitud enviada!
            </Text>
            <Text className={text}>
              El dueño ha sido notificado y se le han compartido tus datos de
              contacto
            </Text>
            <Text className={text}>
              Si está interesado se contactará contigo.
            </Text>
            <Text className={text}>¡Muchas gracias!</Text>
          </BottomSheetView>
        </View>
      )}
    </View>
  );
};

const text = "text-xl text-center my-3";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#d9d9d9",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 20,
    padding: 8,
    backgroundColor: "#1e1e1e",
    width: "80%",
    height: 250,
    alignSelf: "center",
    color: "#D9D9D9",
  },
});

export default BottomView;
