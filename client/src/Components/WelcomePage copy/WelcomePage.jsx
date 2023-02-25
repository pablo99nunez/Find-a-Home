import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
} from "react-native";
import Dots from "../Dots/Dots";

import { useSelector } from "react-redux";
import logoYellow from "../../images/icon1-icon3-welcome.png";
import logoPink from "../../images/icon2-welcome.png";
import GoogleImage from "../../images/Google.svg";
import GoogleButton from "../Buttons/GoogleAuth";
import Slider from "../Slider/Slider";

const { width, height } = Dimensions.get("window");

const children = [
  <View
    className="bg-brown justify-center items-center p-10 z-[30]"
    key={"slide-1"}
  >
    <Text className="text-2xl text-center text-white ">
      Somos una{"\n"}
      organización sin{"\n"}
      fines de lucro que{"\n"}
      busca ayudar a las{"\n"}
      mascotas a{"\n"}
      encontrar un hogar.
    </Text>
  </View>,
  <View
    className="bg-pink justify-center items-center p-10 z-[40]"
    key={"slide-2"}
  >
    <Text className="text-2xl text-center text-white ">
      Podrás adoptar a tu{"\n"}
      mascota soñada{"\n"}o encontrarle un mejor hogar{"\n"}a un gatito
      rescatado.
    </Text>
  </View>,
  <View
    className="bg-yellow justify-center items-center p-10 z-[50]"
    key={"slide-3"}
  >
    <Text className="text-2xl text-center text-black ">
      No discriminamos{"\n"}
      por raza y{"\n"}
      priorizamos a los{"\n"}
      que más tiempo{"\n"}
      lleven sin un hogar.
    </Text>
  </View>,
];

const Welcome = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [contrast, setContrast] = useState(false);
  const isLoggedIn = useSelector((store) => store.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigation.navigate("Home");
  }, [isLoggedIn]);

  return (
    <View>
      {/* <Image
        className="h-14 w-14 absolute right-5 top-10 z-[999]"
        style={{ resizeMode: "contain" }}
        source={contrast ? logoPink : logoYellow}
      ></Image> */}
      <Slider whereContrast={[2]} contrast={setContrast}>
        {children}
      </Slider>
    </View>
  );
};

export default Welcome;
