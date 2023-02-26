import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native-gesture-handler";
import { ButtonYellow, EditButton } from "../Buttons/Buttons";
import { calculateAdoptionDays } from "../Funciones/DiasAdopcion";
import { HeaderDetail } from "./HeaderDetail";
import BottomView from "./BottomView";
import BottomSheet from "@gorhom/bottom-sheet";
import { Characteristics } from "./Characteristics";
import mapStyle from "./mapStyle.json";
//FIREBASE IMPORT ZONE
import firebase from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { BottomViewOwner } from "./BottomViewOwner";
import { ReportPet } from "./ReportPet";
import ImageModal from "../ImageModal/ImageModal";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { width } = Dimensions.get("screen");

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
    birthday,
    age,
    state,
    owner,
    solicitudes,
    coordinates,
    id,
  } = route.params;

  const calcAge = () => {
    const birth = new Date(birthday);
    const now = new Date();
    const diff = now - birth;
    const ageInMilliseconds = diff;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInMonths = ageInDays / 30.44;
    const ageInYears = ageInMonths / 12;
    const years = Math.floor(ageInYears);
    const months = Math.floor(ageInMonths - years * 12);
    return `${years} años ${months} meses`;
  };
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
  }

  const petId = route.params.id;

  const currentUser = useSelector((state) => state.currentUser);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);
  return (
    <View className="h-full w-full bg-grey-100 flex">
      <HeaderDetail
        onPress={() => navigation.goBack()}
        days={days}
        owner={owner}
        currentUser={currentUser}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className={`h-[50vh] flex items-center justify-center -z-[10]`}>
          <LinearGradient
            className="h-1/2 w-full z-[10] absolute bottom-0"
            colors={["#00000000", "#d9d9d9"]}
          ></LinearGradient>
          <Image
            className="absolute w-full h-full"
            style={{
              resizeMode: "cover",
            }}
            source={{ uri: profilePic }}
          ></Image>
          <Text
            style={{ fontFamily: "Roboto_100Thin" }}
            className="text-yellow text-7xl text-center my-12"
          >
            {name}
          </Text>
          {gallery && (
            <FlatList
              horizontal={true}
              keyExtractor={(item, index) => name + index}
              data={gallery}
              className="absolute bottom-0 z-[11] "
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="w-[90] h-[90] rounded overflow-hidden ml-2"
                  onPress={() => {
                    setImageModal(item);
                    setOpenImageModal(true);
                  }}
                >
                  <Image source={{ uri: item }} className="flex-1" />
                </TouchableOpacity>
              )}
            ></FlatList>
          )}
        </View>
        <View className="mt-6">
          <Text
            style={{ fontFamily: "Roboto_300Light" }}
            className="text-3xl text-center w-11/12 mx-auto"
          >
            {description}
          </Text>
        </View>
        <View className="mt-6 px-6">
          <Characteristics
            size={size.toLowerCase()}
            age={age ? age : calcAge()}
          />
        </View>
        <View className="w-[80%] self-center bg-red-400 h-32 mt-6 rounded-xl overflow-hidden">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ width: "100%", height: "100%" }}
            customMapStyle={mapStyle}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.01,
              longitudeDelta: 0.03,
            }}
          >
            <Marker coordinate={coordinates}></Marker>
          </MapView>
        </View>
        {state != "Adopted" && (
          <View className="h-[25vh] justify-center">
            {currentUser.email === owner ? (
              <View className="flex flex-row justify-start">
                <View className="w-[80%]">
                  {solicitudes.length ? (
                    <View className="bg-[#fa1d1d] w-8 h-8 rounded-full items-center justify-center self-end mr-[15%] mb-[-5%] z-10">
                      <Text className="text-xl text-white">
                        {solicitudes.length}
                      </Text>
                    </View>
                  ) : null}
                  <ButtonYellow
                    text="Solicitudes"
                    onPress={() => handleSolicitudes()}
                  />
                </View>
                <View className="flex justify-center">
                  <EditButton
                    onPress={() => navigation.navigate("EditPet", route.params)}
                  />
                </View>
              </View>
            ) : (
              <View className="flex flex-row justify-center items-center mb-4">
                <ButtonYellow
                  text="Adoptar"
                  onPress={() => HandleLoginToAdoption()}
                />
                <ReportPet id={id} />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {Platform.OS !== "web" ? (
        <BottomSheet
          style={{ zIndex: 100 }}
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
              petId={petId}
              name={name}
              navigation={navigation}
            />
          ) : (
            <BottomView
              email={owner}
              auth={auth}
              petName={name}
              petId={petId}
            />
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
      <ImageModal
        imageUrl={imageModal}
        isOpen={openImageModal}
        onClose={() => setOpenImageModal(false)}
      ></ImageModal>
    </View>
  );
}
