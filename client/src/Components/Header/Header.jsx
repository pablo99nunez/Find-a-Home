import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
  Image,
  Platform,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPets,
  getPetsByZone,
  getPetsFilteredBySize,
  getPetsFilteredBySpecie,
  getPetsFilteredByTwoFilters,
  getUser,
} from "../../Redux/Actions";
import firebase from "../../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("screen");

export const Header = ({ navigation }) => {
  const auth = getAuth(firebase);
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const email = auth.currentUser?.email;

  const pickerRef = useRef();

  const dispatch = useDispatch();
  const allPets = useSelector((state) => state.allPets);

  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const [specie, setSpecie] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (size === "" && specie === "") {
      dispatch(getAllPets());
    } else if (size === "" && specie !== "") {
      dispatch(getPetsFilteredBySpecie(specie));
    } else if (size !== "" && specie === "") {
      dispatch(getPetsFilteredBySize(size));
    } else if (size !== "" && specie !== "") {
      dispatch(getPetsFilteredByTwoFilters([size, specie]));
    }
  }, [specie, size]);

  useEffect(() => {
    if (isLoggedIn)
      dispatch(getUser());
  }, []);

  const [pin, setPin] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync().catch(
        () => {
          console.error("⚠️ Error -> 🚨 Header -> 🔔permission not granted");
        }
      );
      if (status !== "granted") {
        console.error("⚠️ Error -> 🚨 Header -> 🔔Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      }).catch(() => {
        console.error("⚠️ Error -> 🚨 Header -> 🔔Location wasn't found");
      });

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const currentUser = useSelector((state) => state.currentUser);

  const resizeBox = (to) => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  const [number, setNumber] = useState("");

  let coordsToSend = {
    coords: {
      latitude: pin.latitude,
      longitude: pin.longitude,
    },
  };
  useEffect(() => {
    dispatch(getPetsByZone(number, coordsToSend));
  }, [number]);

  return (
    <View className="flex flex-row justify-between items-center mt-[7%] pl-[5%] pr-[5%]">
      {isLoggedIn ? (
        <TouchableOpacity onPress={() => navigation.navigate("UserDetail")}>
          <Image
            className="w-14 h-14 rounded-full"
            resizeMode={"contain"}
            source={{
              uri: currentUser.profilePic,
            }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image
            className="w-14 h-14 rounded-full"
            resizeMode={"contain"}
            source={require("../../images/profilePic.jpg")}
          />
        </TouchableOpacity>
      )}

      <Image
        className="w-14 h-14"
        source={require("../../images/FindAHome.png")}
        resizeMode={"contain"}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Map", pin)}>
        <Icon name="map" className="w-12 h-12" size={50} color={"#FFC733"} />
      </TouchableOpacity>
      {Platform.OS === "web" ? <></> : <></>}
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Icon name="menu" className="w-12 h-12" size={50} color={"#FFC733"} />
      </TouchableOpacity>
      {/* WEB BROWSER ACA ----------------------- userddetlail */}
      {Platform.OS === "web" ? (
        <TouchableOpacity
          onPress={() => {
            if (auth.currentUser?.uid) navigation.navigate("UserDetail");
            else navigation.navigate("Login");
          }}
        >
          <Text>USER PROFILE WEB BROWSER</Text>
        </TouchableOpacity>
      ) : (
        <Modal transparent visible={visible}>
          <SafeAreaView>
            <View className="items-end right-[5%] opacity-0">
              <Icon
                name="menu"
                size={50}
                color={"#FFC733"}
                onTouchStart={() => resizeBox(0)}
              />
            </View>
            <Animated.View className="rounded-3xl bg-[#FFC733] w-[90%] ml-[5%] mr-[5%] mt-[3%]">
              <View className="p-[5%]">
                <Text className="text-2xl mb-[3%]" style={{fontFamily: 'Roboto_300Light'}}>Especie:</Text>

                <SelectList
                  data={[
                    { key: "", value: "Todos" },
                    { key: "Perro", value: "Perro" },
                    { key: "Gato", value: "Gato" },
                    { key: "Otro", value: "Otro" },
                  ]}
                  placeholder="Seleccionar"
                  setSelected={(val) => {
                    // filterBySpecie(val)
                    setSpecie(val);
                  }}
                  boxStyles={{ backgroundColor: "#D9D9D9", }}
                  inputStyles={{ color: "#717171", fontSize: 18 }}
                  dropdownStyles={{ backgroundColor: "#D9D9D9" }}
                  dropdownTextStyles={{ color: "#717171", fontSize: 18 }}
                  search={false}
                />

                <Text className="text-2xl mb-[3%] mt-[3%]" style={{fontFamily: 'Roboto_300Light'}}>Tamaño:</Text>

                <View className="flex flex-row justify-around items-end w-11/12 mx-auto">
                  <TouchableOpacity
                    onPress={() => {
                      if (size !== "small") {
                        setSize("small");
                      } else {
                        setSize("");
                      }
                    }}
                  >
                    {size == "small" ? (
                      <Image
                        style={{ width: width * 0.15, height: width * 0.15 }}
                        source={require("../../images/perro_rosa.png")}
                      />
                    ) : (
                      <Image
                        style={{ width: width * 0.15, height: width * 0.15 }}
                        source={require("../../images/perro_negro.png")}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (size !== "medium") {
                        setSize("medium");
                      } else {
                        setSize("");
                      }
                    }}
                  >
                    {size == "medium" ? (
                      <Image
                        style={{ width: width * 0.20, height: width * 0.20 }}
                        source={require("../../images/perro_rosa.png")}
                      />
                    ) : (
                      <Image
                        style={{ width: width * 0.20, height: width * 0.20 }}
                        source={require("../../images/perro_negro.png")}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (size !== "large") {
                        setSize("large");
                      } else {
                        setSize("");
                      }
                    }}
                  >
                    {size == "large" ? (
                      <Image
                        style={{ width: width * 0.25, height: width * 0.25 }}
                        source={require("../../images/perro_rosa.png")}
                      />
                    ) : (
                      <Image
                        style={{ width: width * 0.25, height: width * 0.25 }}
                        source={require("../../images/perro_negro.png")}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                  
                <Text className="text-2xl mb-[3%] mt-[3%]" style={{fontFamily: 'Roboto_300Light'}}>Kilometros:</Text>
                <TextInput
                  placeholder="Mascotas en tu radio de km."
                  fontFamily="Roboto_300Light"
                  boxStyles={{ backgroundColor: "#D9D9D9" }}
                  keyboardType="numeric"
                  value={number}
                  onChangeText={(text) => setNumber(text)}
                  className="h-[14%] bg-[#D9D9D9] rounded-md text-[#717171] text-center"
                  style={{fontFamily: 'Roboto_300Light'}}
                />
              </View>
            </Animated.View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 80,
    backgroundColor: "#AB4E68",
  },
  icon: {
    position: "absolute",
    margin: 15,
    width: 50,
    height: 50,
    top: 20,
    left: 340,
  },
  popUp: {
    borderRadius: 10,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#FFC733",
    paddingHorizontal: 130,
    paddingVertical: 150,
    position: "absolute",
    top: 75,
    right: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#ccc",
  },
  inputPicker: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    fontSize: 25,
    borderWidth: 1,
    borderColor: "gray",
    padding: 1,
  },
});
