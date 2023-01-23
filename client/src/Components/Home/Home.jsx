import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Card from "../Card/Card";
import { Header } from "../Header/Header";
import { useDispatch, useSelector } from "react-redux"
import { getAllPets } from "../../Redux/Actions";

const { width, height } = Dimensions.get("screen");

export default function Home({ navigation }) {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllPets())
  }, [])

  const allPets = useSelector((state) => state.allPets)
  // const [pet, setPet] = useState(petDb);

  // const filterBySpecie = (specie) => {
  //   if (specie === "All") {
  //     setPet(petDb);
  //   } else setPet(pet.filter((el) => el.specie == specie));
  // };

  // const filterBySize = (size) => {
  //   if (size === "All") {
  //     setPet(petDb);
  //   } else setPet(pet.filter((el) => el.size == size));
  // };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        // filterBySpecie={filterBySpecie}
        // filterBySize={filterBySize}
      />
      <FlatList
        style={styles.body}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={allPets.payload}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
      ></FlatList>
      {/* <TouchableOpacity className="fixed bg-inherit">
        <Image
        className="w-16 h-16 flex flex-row justify-center items-center mx-auto w-16"
        source={require("../../images/Trust.png")}
        />
      </TouchableOpacity> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa",
    width,
  },

  body: {
    backgroundColor: "#AB4E68",
    padding: 10,
  },
});