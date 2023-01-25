import React from "react";

//3 lineas son las importaciones q hago por todos lados
//Deberia modularizar? Sí.
//Voy a modularizar? Yo diria que no.
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import firebase from "../../firebase/config";

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { callApiWithAppCheckExample } from "../../firebase/fetch.middleware";
import { ButtonYellow } from "../Buttons/Buttons";
import Header from "./Header";
import { useSelector } from "react-redux";

// const { width, height } = Dimensions.get("screen")
const HEIGHT = Dimensions.get("screen").height;

export default function UserDetail({ route, navigation }) {
  //test, borrable:
  function doFetchCheck() {
    callApiWithAppCheckExample();
  }

  //NO BORRAR A NO SER Q QUIERAN MEJORARLO---------------------
  const auth = getAuth(firebase);
  function logoutUser() {
    signOut(auth)
      .then(() => {
        // clear session storage
        AsyncStorage.clear(() => {
          AsyncStorage.clear();
          navigation.navigate("LandigPage");
        });
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }
  //-----------------------------------------------------------

  const user = {
    id: 1,
    firstName: "Messi",
    lastName: "Chiquito",
    age: 35,
    rating: 5,
    profilePic: "https://pbs.twimg.com/media/FdSKUwgWIAEJNX0.jpg",
    description:
      "Soy Lionel Andrés Messi Cuccittini, nací en Rosario, el 24 de junio de 1987, soy conocido como Leo Messi, soy un futbolista argentino que juega como delantero o centrocampista, actual Mejor Jugador y Campeón del Mundo",
    address: "Torre Eiffel",
    pets: [
      {
        id: 100,
        name: "mbappe",
        age: 2,
        rescued: "2 days ago",
        profilePic:
          "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
        createdAt: "2023-01-01T22:58:33.462Z",
        gallery: [
          "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
          "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
          "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
        ],
        description: "Segundo",
      },
      {
        id: 200,
        name: "mauricio",
        age: 2,
        rescued: "2 days ago",
        profilePic:
          "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
        createdAt: "2023-01-01T22:58:33.462Z",
        gallery: [
          "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
          "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
          "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
        ],
        description: "No se inunda mas",
      },
      {
        id: 300,
        name: "juan",
        age: 2,
        rescued: "2 days ago",
        profilePic:
          "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
        createdAt: "2023-01-01T22:58:33.462Z",
        gallery: [
          "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
          "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
          "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
        ],
        description: "Juan 👍",
      },
    ],
  };
  const asd = useSelector((state) => state.allPets);

  return (
    <View
      style={{ height: HEIGHT }}
      className="bg-[#ACACAC] flex justify-between"
    >
      <ImageBackground
        style={{
          width: "100%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}
        source={{ uri: user.profilePic }}
        blurRadius={10}
      >
        <LinearGradient
          colors={["#00000000", "#ACACAC"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View>
            <Header
              onPress={() => navigation.navigate("Home")}
              navigation={() => navigation.navigate("CreateDog")}
            />
            <Image
              className="w-80 h-80 bottom-6 mx-auto rounded-full"
              source={{ uri: user.profilePic }}
            />
            <View className="flex flex-row justify-between w-11/12 mx-auto top-4">
              {/* <Text className=" text-4xl">{asd}</Text> <-- Esto no funciona */}
              <Text className=" text-4xl">{user.rating}⭐</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View>
        <Text className="text-center text-2xl top-14 text-[#2A2B20]">
          {user.description}
        </Text>
      </View>

      <View className="-top-8 mx-auto">
        <FlatList
          keyExtractor={(item) => item.id}
          data={user.pets}
          horizontal={true}
          // className="bg-black w-12/12"
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", item)}
            >
              <View className="flex items-center mx-4">
                <Image
                  style={{ width: 120, height: 120 }}
                  source={{
                    uri: item.profilePic,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>

      <View className="-top-20">
        <ButtonYellow text="Logout" onPress={logoutUser} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
