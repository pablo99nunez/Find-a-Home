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
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import { getAllPets, getPetsFilteredBySize, getPetsFilteredBySpecie, getPetsFilteredByTwoFilters } from "../../Redux/Actions";

const { width, height } = Dimensions.get("screen");

export const Header = ({ navigation, filterBySize}) => {

  const pickerRef = useRef();

  const dispatch = useDispatch()
  const allPets = useSelector((state) => state.allPets)

  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  const [specie, setSpecie] = useState("");
  const [size, setSize] = useState("")

   useEffect(() => {
    if (size === "" && specie === "") {
      dispatch(getAllPets())
    } else if (size === "" && specie !== "") {
      dispatch(getPetsFilteredBySpecie(specie))
    } else if (size !== "" && specie === "") {
      dispatch(getPetsFilteredBySize(size))
    } else if (size !== "" && specie !== "") {
      dispatch(getPetsFilteredByTwoFilters([size, specie]))
    }
  }, [specie, size]);

  const resizeBox = (to) => {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    })
    .start(() => to === 0 && setVisible(false));
  };

  return (
    <View className="bg-[#AB4E68] h-[11%] flex flex-row justify-between px-[4%] pt-[7%]">
      <TouchableOpacity onPress={() => navigation.navigate("UserDetail")}>
        <Image
          className="w-12 h-12 rounded-full"
          resizeMode={"contain"}
          source={require("../../images/profilePic.jpg")}
        />
      </TouchableOpacity>

      <Image
        className="w-14 h-14"
        source={require("../../images/FindAHome.png")}
        resizeMode={"contain"}
      />

      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Icon 
          name="menu" 
          className="w-12 h-12"
          size={50} 
          color={"#FFC733"} />
      </TouchableOpacity>

      <Modal transparent visible={visible}>
        <SafeAreaView >
          <View className="h-20 justify-end items-end mr-6 pb-3 content-center opacity-0">
            <Icon 
            name="menu" 
            size={50} 
            color={"#FFC733"} 
            onTouchStart={() => resizeBox(0)}/>
          </View>
          <Animated.View
            className="rounded-3xl border-[#FFC733] border-2 bg-[#FFC733] w-full"
          >          
            <View className="px-2"> 
                
                <Text className="ml-3 mt-14 mb-5 text-4xl">
                  Especie:
                </Text>

              <SelectList
                data={[
                  {key:"", value:"Todos"},
                  {key:"Perro", value:"Perro"},
                  {key:"Gato", value:"Gato"},
                  {key:"Otro", value:"Otro"}
                ]}
                placeholder="Seleccionar"
                setSelected={(val)=>{
                  // filterBySpecie(val)
                  setSpecie(val)
                }}
                boxStyles={{backgroundColor:"#1E1E1E"}}
                inputStyles={{color:"#FFF", fontSize: 18, padding:5}}
                dropdownStyles={{backgroundColor:"#2E2E2E"}}
                dropdownTextStyles={{color:"#FFF", fontSize: 18}}							
              />

              <Text className="ml-3 mt-14 mb-4 text-4xl">
                Tamaño:
              </Text>
              
              <View className="flex flex-row  justify-around items-end w-11/12 mx-auto">
                <TouchableOpacity 
                  onPress={() => { 
                    if (size !== "small"){                    
                    setSize("small") } else {                                    
                    setSize("")}
                  }}>
                  {size == "small" ?
                  <Image
                      className="mt-8 mb-24"
                      style={{width:90, height:90}}
                      source={require('../../images/perro_rosa.png')}
                    />
                  :
                  <Image
                    className="mt-8 mb-24"
                    style={{width:90, height:90}}
                    source={require('../../images/perro_negro.png')}
                  />
                  }
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {
                    if (size !== "medium"){                      
                      setSize("medium") } else {                                 
                      setSize("")}                   
                  }}>
                  {size == "medium" ?
                    <Image
                      className="mt-8 mb-24"
                      style={{width:145, height:145}}
                      source={require('../../images/perro_rosa.png')}
                    />
                    :
                    <Image
                    className="mt-8 mb-24"
                    style={{width:145, height:145}}
                    source={require('../../images/perro_negro.png')}
                    />
                  }
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {
                    if (size !== "large"){                      
                      setSize("large") } else {                      
                      setSize("")}                    
                  }}>
                  {size == "large" ?
                  <Image
                    className="mt-8 mb-24"
                    // style={{width:145, height:145}}
                    source={require('../../images/perro_rosa.png')}
                  />
                  :
                  <Image
                    className="mt-8 mb-24"
                    // style={{width:145, height:145}}
                    source={require('../../images/perro_negro.png')}
                  />
                  }
                </TouchableOpacity>
              </View>
              {/* <Picker
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
                <Picker.Item label="large" value="large" />
              </Picker>*/}
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