import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("screen");

export const Header = ({ navigation, filterBySpecie }) => {
  const [userInput, setUserInput] = useState({
    especie: "",
  });
  const pickerRef = useRef();

  ///
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const [specie, setSpecie] = useState("All");

  /* useEffect(() => {
    getPets();
  }, [specie]); */

  /*   const getPets = async () => {      GENTE!!!!!!!!!!!!!!: ESTE SERÁ EL FILTRO REAL, CUANDO CONECTEMOS LAS PETS DE LA DB AL FRONT UWU
    const IPv4 = "192.168.1.118";
    let url = `http://${IPv4}:8080/filtro/specie/${specie}`;

    const result = await fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }; */

  const resizeBox = (to) => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("UserDetail")}>
        <Image
          className="drop-shadow-2xl w-12 h-12 absolute left-5 top-8 rounded-full"
          resizeMode={"contain"}
          source={require("../../images/profilePic.jpg")}
        />
      </TouchableOpacity>

      <Image
        className="drop-shadow-2xl w-14 h-14 absolute left-44 top-7"
        source={require("../../images/FindAHome.png")}
        resizeMode={"contain"}
      />
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Icon name="menu" size={40} style={styles.icon} color={"#FFC733"} />
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <SafeAreaView style={{ flex: 1 }} onTouchStart={() => resizeBox(0)}>
          <Animated.View
            style={[
              styles.popUp,
              {
                opacity: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              {
                transform: [{ scale: scale }],
              },
            ]}
          >
            {/* {options.map((op, i) => (
              <View>
                <TouchableOpacity
                  style={styles.option}
                  key={i}
                  onPress={() => {
                    op.action();
                  }}
                >
                  <Text>{op.title}</Text>
                  <Icon
                    name={op.icon}
                    size={40}
                    color={"#212121"}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
            ))} */}
            <View>
              <TouchableOpacity style={styles.option} key={1}>
                <Text>Especie</Text>
              </TouchableOpacity>
              <Picker
                style={styles.inputPicker}
                ref={pickerRef}
                selectedValue={specie}
                onValueChange={(itemValue, itemIndex) => {
                  console.log(itemValue);
                  filterBySpecie(itemValue);
                  setSpecie(itemValue);
                }}
              >
                <Picker.Item label="Seleccionar" value="Seleccionar" />
                <Picker.Item label="Todos" value="All" />
                <Picker.Item label="Perro" value="Perro" />
                <Picker.Item label="Gato" value="Gato" />

                <Picker.Item label="Otro" value="Otro" />
              </Picker>
              <TouchableOpacity
                style={styles.option}
                key={2}
                onPress={() => {
                  alert("tamaño filtro tests");
                }}
              >
                <Text>Tamaño</Text>
              </TouchableOpacity>
              <Picker
                style={styles.inputPicker}
                ref={pickerRef}
                selectedValue={userInput.especie}
                onValueChange={(itemValue, itemIndex) =>
                  setUserInput({ ...userInput, especie: itemValue })
                }
              >
                <Picker.Item label="Small" value="Small" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Large" value="Large" />
              </Picker>
            </View>
          </Animated.View>
        </SafeAreaView>
      </Modal>
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
