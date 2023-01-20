import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
/* import SelectDropDown from "react-native-select-dropdown"; */


export const Header = () => {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const species = ["perro", "gato", "otro"];
  const options = [
    {
      title: "Especie",
      icon: "star",
      action: () => console.log("filtro especie"),
    },
    { title: "Tamaño", icon: "plus", action: () => alert("Story") },
  ];
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
    <>
      {/* <SelectDropDown data={species} /> */}
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Icon name="menu" size={34} color={"#212121"} style={styles.icon} />
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
            {options.map((op, i) => (
              <TouchableOpacity
                style={styles.option}
                key={i}
                onPress={() => {
                  op.action;
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
            ))}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "relative",
    marginHorizontal: 10,
    marginVertical: 10,
    top: 20,
    left: 320,
  },
  popUp: {
    borderRadius: 10,
    borderColor: "#333",
    borderWidth: 1,
    backgroundColor: "#FFC733",
    paddingHorizontal: 100,
    paddingVertical: 85,
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
});
