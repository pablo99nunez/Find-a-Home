import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { calculateAdoptionDays } from "../Funciones/DiasAdopcion";
import { HeaderDetail } from "./HeaderDetail";
import BottomView from "./BottomView";
import BottomSheet from "@gorhom/bottom-sheet";
import { Characteristics } from "./Characteristics";
//FIREBASE IMPORT ZONE
import firebase from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { BottomViewOwner } from "./BottomViewOwner";

export default function Detail({ route, navigation }) {
  //FIREBASE ZONE - DO NOT CHANGE
  const auth = getAuth(firebase);
  //
  const {
    profilePic,
    name,
    created_at,
    gallery,
    description,
    size,
    age,
    state,
    owner,
    solicitudes,
    latitud,
    longitud,
  } = route.params;

  const days = calculateAdoptionDays(created_at);
  //--------- BOTTOM SHEET FUNCTIONS-----------//
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["55%", "77%"], []);
  const [open, setOpen] = useState(-1);
  //------------------------------------------//
  //if no user logged in, it redirects you to login//
  function HandleLoginToAdoption() {
    auth.currentUser?.uid ? setOpen(0) : navigation.navigate("Login");
  }
  //if the owner press solicitudes he will see a list of adoption requests//
  function handleSolicitudes() {
    setOpen(0);
    console.log(solicitudes);
  }

  const petId = route.params.id;

  const currentUser = useSelector((state) => state.currentUser);

  return (
    <View>
      <View className="bg-[#acacac] h-full">
        <ImageBackground style={styles.profilePic} source={{ uri: profilePic }}>
          <LinearGradient
            colors={["#00000000", "#acacac"]}
            style={{ height: "100%", width: "100%" }}
          >
            <View className="h-1/3">
              <View>
                <HeaderDetail onPress={() => navigation.goBack()} days={days} />
              </View>

              <View className="h-52">
                <Text className="text-[#f5c936] text-4xl text-center my-12">
                  {name.toUpperCase()}
                </Text>
              </View>

              <View className="mx-auto">
                {gallery ? (
                  <FlatList
                    horizontal={true}
                    keyExtractor={(name) => name}
                    data={gallery}
                    renderItem={({ item }) => (
                      <Image style={styles.gallery} source={{ uri: item }} />
                    )}
                  ></FlatList>
                ) : (
                  <View className="min-h-[120px]"></View>
                )}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        <View className="h-1/4">
          <Text className="text-2xl text-center w-11/12 mx-auto font-semibold">
            {state}
          </Text>
          <Text className="text-2xl text-center w-11/12 mx-auto">
            {description}
          </Text>
        </View>
        <Characteristics size={size.toLowerCase()} age={age} />
        <View>
          <Text>
            Coordenadas: latitud:{latitud} longitud:{longitud}
          </Text>
        </View>

        {["Adopted", "NotAdoptable"].includes(state) ? null : (
          <View className="h-1/4 flex justify-evenly">
            {currentUser.email === owner ? (
              <ButtonYellow
                text="Solicitudes"
                onPress={() => handleSolicitudes()}
              />
            ) : (
              <ButtonYellow
                text="Adoptar"
                onPress={() => HandleLoginToAdoption()}
              />
            )}
          </View>
        )}
      </View>

      {Platform.OS !== "web" ? (
        <BottomSheet
          backgroundStyle={styles.containerInput}
          ref={bottomSheetRef}
          index={open}
          snapPoints={snapPoints}
          keyboardBehavior="extend"
          enablePanDownToClose={true}
          onClose={() => setOpen(-1)}
        >
          {owner === currentUser.email ? (
            <BottomViewOwner
              solicitudes={solicitudes}
              navigation={navigation}
            />
          ) : (
            <BottomView auth={auth} petId={petId} />
          )}
        </BottomSheet>
      ) : (
        <View className="h-1/4 flex justify-evenly">
          <ButtonYellow
            text="Adoptar"
            onPress={() => HandleLoginToAdoption()}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: "100%",
    height: 400,
  },
  gallery: {
    width: 90,
    height: 90,
    marginLeft: 25,
    borderRadius: 5,
  },
  containerInput: {
    backgroundColor: "#d9d9d9",
  },
});
