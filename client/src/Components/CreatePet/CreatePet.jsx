import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Modal } from "react-native";
import { useState } from "react";
import { PetPost } from "../../Redux/Actions/index";
import * as Location from "expo-location";
import { ButtonYellow } from "../Buttons/Buttons";
import FormPet from "./FormPet";
import FormPetsTwo from "./FormPetsTwo";
import { EvilIcons } from "@expo/vector-icons";
import { uploadImage } from "./utils";

export const CreatePet = ({ navigation }) => {
  const [pin, setPin] = useState({
    latitude: -34.628517,
    longitude: -58.45905,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync().catch(
        () => {
          console.error("CreatePet.jsx: permission not granted");
        }
      );
      if (status !== "granted") {
        console.error(
          "CreatePet.jsx: Permission to access location was denied"
        );

        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      }).catch(() => {
        console.error("CreatePet.jsx: location wasn't found");
      });

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  const [crear, setCrear] = useState({
    name: "",
    description: "",
    birthday: "",
    size: "",
    state: "",
    specie: "",
    profilePic: "",
    photos: [],
  });

  const [error, setError] = useState({});
  const [visible, setVisible] = React.useState(false);

  const handleSubmit = async () => {
    if (!crear.specie) {
      setError({ ...error, specie: "Por favor, selecciona una especie" });
      return;
    }

    if (!error.name && !error.description && !error.birthday) {
      try {
        let photos = [];
        let promises = [];
        let profilePic;

        crear.photos.forEach((e, i) => {
          promises.push(
            uploadImage(e, setUploading)
              .then((url) => {
                if (i == 0) {
                  profilePic = url;
                } else photos.push(url);
              })
              .catch((err) => console.error(err))
          );
        });

        await Promise.all(promises);

        const DatosPetAEnviar = {
          name: crear.name,
          description: crear.description,
          birthday: crear.birthday,
          size: crear.size,
          profilePic:
            profilePic ||
            "https://us.123rf.com/450wm/natbasil/natbasil1601/natbasil160100031/52068222-animales-siluetas-perro-gato-y-conejo-logotipo-de-la-tienda-de-animales-o-cl%C3%ADnica-veterinaria-ilustr.jpg?ver=6",
          gallery: photos,
          specie: crear.specie,
          state: crear.state,
          coordinates: {
            latitude: pin.latitude,
            longitude: pin.longitude,
          },
        };
        console.log(DatosPetAEnviar);

        await PetPost(DatosPetAEnviar);

        navigation.navigate("Home");
        setCrear({
          name: "",
          description: "",
          birthday: "",
          size: "",
          state: "",
          specie: "",
          profilePic: "",
          photos: [],
        });
      } catch (error) {
        console.error(
          "⚠️ Error -> 🚨 CreatePet -> 🔔PetPost: " + error.message
        );
      }
    } else {
      alert("Por favor completa todos los datos");
    }
  };

  //verbo singular, el useState altera el valor de esta variable en cada renderizado
  //disable=true si UNA de las condiciones de abajo se cumple
  const disable =
    crear.name.length === 0 ||
    crear.description.length === 0 ||
    crear.birthday.length === 0 ||
    crear.size.length === 0 ||
    crear.specie.length === 0 ||
    crear.photos.length === 0;

  const [uploading, setUploading] = useState(false);

  return (
    <>
      <ScrollView className="bg-[#d9d9d9]">
        <FormPet
          setCrear={setCrear}
          crear={crear}
          error={error}
          setError={setError}
        />

        <View className="my-[10%]">
          {/* {!uploading ? ( */}
          <ButtonYellow
            deshabilitar={disable}
            onPress={() => handleSubmit()}
            text="Publicar"
          />
          {/*   ) : (
            <EvilIcons name="spinner-3" size={24} color="black" />
          )} */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    backgroundColor: "#d9d9d9",
  },
});
