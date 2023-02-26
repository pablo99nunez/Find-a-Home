import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/firebase-config";
import { AntDesign } from "@expo/vector-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ButtonYellow } from "../Buttons/Buttons";
import { FlatList } from "react-native-gesture-handler";

export const Photos = ({ photos, setPhotos }) => {
  const [uploading, setUploading] = useState(false);

  const pickImage = async (imageType) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      }).catch((err) => {
        console.error(
          "⚠️ Error -> 🚨 CreatePets - Photos -> 🔔pickImage: 1 " + err.message
        );
      });

      if (!result.canceled) {
        console.log(result.assets[0]);
        if (imageType == "profile") {
          setPhotos([result.assets[0].uri, ...photos.slice(1)]);
        } else setPhotos([...photos, result.assets[0].uri]);
        /*   await uploadImage(result.assets[0].uri, imageType).catch((err) => {
          console.error(
            "⚠️ Error -> 🚨 CreatePets - Photos -> 🔔pickImage: 2 " +
              err.message
          );
        }); */
      }
    } catch (err) {
      console.error(
        "⚠️ Error -> 🚨 CreatePets - Photos -> 🔔pickImage: 3 " + err
      );
    }
  };

  return (
    <View>
      <View>
        <Text className="text-2xl font-extralight mb-3">Foto de perfil</Text>
      </View>
      <TouchableOpacity
        className="object-fill w-full h-52 mx-auto rounded-md overflow-hidden"
        onPress={() => pickImage("profile")}
      >
        {photos.length == 0 ? (
          <Image
            source={require("../../images/camera.png")}
            className="w-[70%] h-52 mx-auto rounded-md"
          />
        ) : (
          <Image
            source={{ uri: photos[0] }}
            style={{
              height: undefined,
              width: undefined,
              flex: 1,
              resizeMode: "contain",
            }}
          />
        )}
      </TouchableOpacity>

      {photos.length >= 1 && (
        <View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-2xl font-extralight my-3">Galeria</Text>
            {photos.length < 7 && (
              <View className="mt-3">
                <AntDesign
                  name="pluscircle"
                  size={32}
                  color="#AB4E68"
                  onPress={() => {
                    pickImage("gallery");
                  }}
                />
              </View>
            )}
          </View>
          <View className="flex flex-row gap-2 flex-wrap justify-center mt-2">
            {photos.length === 1 ? (
              <Text>No has seleccionado ninguna foto para la galería</Text>
            ) : (
              photos.slice(1).map((item, i) => (
                <View className="w-[40%] h-32" key={item}>
                  <Image
                    className="w-full h-full rounded-md"
                    source={{ uri: item }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      setPhotos([...photos.filter((pic) => pic !== item)])
                    }
                    className="absolute top-0 right-0"
                  >
                    <AntDesign name="closecircle" size={24} color="#E33a3a" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      )}
    </View>
  );
};
