import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import Card from "../Card/Card";
import { Header } from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllPets } from "../../Redux/Actions";
import { useFocusEffect } from "@react-navigation/native";
import { ButtonCreatePet, ButtonAdminDashboard } from "../Buttons/Buttons";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const allPets = useSelector((state) => state.allPets);
  const currentUser = useSelector((state) => state.currentUser);

  //se ejecuta cuando se vé, focus=concentrar algo asi
  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        dispatch(getAllPets());
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );

  function HandleLoginToAdoption() {
    //función que si eres User dirige a crear Pet; si eres Guest te dirige a Loggearte o Registrarte
    isLoggedIn
      ? navigation.navigate("CreatePet")
      : navigation.navigate("Login");
  }

  return (
    <View className="flex-1 bg-[#AB4E68]">
      <Header navigation={navigation} />
      <FlatList
        numColumns={2}
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={allPets.payload}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
      ></FlatList>
      <StatusBar style="auto" />
      <ButtonCreatePet onPress={HandleLoginToAdoption} />
      {currentUser?.tipo == "Admin" ? (
        <ButtonAdminDashboard
          onPress={() => {
            navigation.navigate("AdminPanel", currentUser);
          }}
        />
      ) : null}
    </View>
  );
}
