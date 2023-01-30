import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { PetPost } from "../../Redux/Actions/index";
import * as Location from "expo-location";
import { ButtonYellow } from "../Buttons/Buttons";

export const CreatePet = ({ navigation }) => {
  const [pin, setPin] = useState({
    latitude: -34.628517,
    longitude: -58.45905,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync().catch(
        () => {
          console.log("error, permission not granted");
        }
      );
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      }).catch(() => {
        console.log("error, location wasn't found");
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
    galeria: [],
  });

  const [error, setError] = useState({});

  const HandleSubmit = async () => {
    if (!error.name && !error.description && !error.birthday) {
      const DatosPetAEnviar = {
        name: crear.name,
        description: crear.description,
        birthday: crear.birthday,
        size: crear.size,
        profilePic:
          crear.galeria[0] ||
          "https://us.123rf.com/450wm/natbasil/natbasil1601/natbasil160100031/52068222-animales-siluetas-perro-gato-y-conejo-logotipo-de-la-tienda-de-animales-o-cl%C3%ADnica-veterinaria-ilustr.jpg?ver=6",
        gallery: [...crear.galeria.slice(1)],
        specie: crear.specie,
        coordinates: {
          latitude: pin.latitude,
          longitude: pin.longitude,
        },
      };
      await PetPost(DatosPetAEnviar)
        .then((sucess) => {
          alert("se creo");
          navigation.goBack();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally((e) => {
          setCrear({
            name: "",
            description: "",
            birthday: "",
            size: "",
            state: "",
            specie: "",
            galeria: [],
          });
        });
    } else {
      alert("Por favor completa todos los datos");
    }
  };

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
          <ButtonYellow onPress={() => HandleSubmit()} text={"Publicar"} />
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
