import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useState } from "react";
import { PetPost } from "../../Redux/Actions/index";
import * as Location from "expo-location";
import { ButtonYellow } from "../Buttons/Buttons";
import FormPet from "./FormPet";
import FormPets from "./FormPets";

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
        console.error("CreatePet.jsx: Permission to access location was denied");

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
    gallery: [],
  });

  const [error, setError] = useState({});

  const HandleSubmit = async () => {
    if (!error.name && !error.description && !error.birthday) {
      const DatosPetAEnviar = {
        name: crear.name,
        description: crear.description,
        birthday: crear.birthday,
        size: crear.size,
        profilePic: crear.profilePic ||
          "https://us.123rf.com/450wm/natbasil/natbasil1601/natbasil160100031/52068222-animales-siluetas-perro-gato-y-conejo-logotipo-de-la-tienda-de-animales-o-cl%C3%ADnica-veterinaria-ilustr.jpg?ver=6",
        gallery: crear.gallery,
        specie: crear.specie,
        state: crear.state,
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
          console.error("⚠️ Error -> 🚨 CreatePet -> 🔔PetPost: " + error.message);
        })
        .finally((e) => {
          setCrear({
            name: "",
            description: "",
            birthday: "",
            size: "",
            state: "",
            specie: "",
            profilePic: "",
            gallery: [],
          });
        });
    } else {
      alert("Por favor completa todos los datos");
    }
  };
  const [paginas, setPaginas] = useState(1)
 
  //verbo singular, el useState altera el valor de esta variable en cada renderizado
  //disable=true si UNA de las condiciones de abajo se cumple
  const disable = `${crear.name}`.length===0 ||
  `${crear.description}`.length===0 ||
  `${crear.birthday}`.length===0 ||
  `${crear.size}`.length===0 ||
  `${crear.specie}`.length===0 ||
  `${error.name}${error.description}${error.birthday}`.length > 0

  const disable2 = `${crear.state}`.length===0 

  return (
    <>

      <ScrollView className="bg-[#d9d9d9]">
        {paginas === 1  ?
       <FormPet
       setCrear={setCrear}
       crear={crear}
       error={error}
       setError={setError}
     />
      
        :
        <FormPets
        setCrear={setCrear}
        crear={crear}
        error={error}
        paginas={paginas}
        setPaginas={setPaginas}
        setError={setError}
      />  
          }
        <View className="my-[10%]">
          {paginas === 1 && !error.size && !error.state && !error.specie ?

        <ButtonYellow deshabilitar={disable} onPress={() => setPaginas(2) } text={disable? "Complete los datos":"Siguiente"}/>

:          
        
          <ButtonYellow deshabilitar={disable2} onPress={() => HandleSubmit()} text={disable2?"Complete los datos":"Publicar"} />
        }
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
