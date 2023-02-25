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
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GoogleAuth from "../Buttons/GoogleAuth";
import Dots from "../Dots/Dots";

const { width, height } = Dimensions.get("screen");

const Welcome = ({ navigation }) => {
  const [viewActive, setViewActive] = useState(1);
  const isLoggedIn = useSelector((store) => store.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) navigation.navigate("Home");
  }, [isLoggedIn]);

  //magia circulito expandible detectand el scroll
  const [xPos, setXPos] = useState(0);
  const handleScroll = (pos) => {
    const newXPos = pos;
    setXPos(newXPos);
  };

  /*
    funcion q maneja el desizamiento de circulitos
    fac = factor de multiplicacion
    side = 'top', 'right'  determina el flujo a seguir con los parametros y q retornar
    type = 'moving' o 'static' determina si algo debe estar fijo o moviendose junto con todo el View
  */
  const responsiveHell = (fac, side, type) => {
    const sign = type === "moving" ? -1 : 1;
    const proportion = height / width;
    if (side === "top") {
      return (fac * height - height * 0.42 - xPos * proportion) * sign;
    }
    if (side === "right") {
      return (fac * width - width * 0.41 - xPos) * sign;
    }
  };

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide =
        Math.round(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        ) + 1;
      //linea magia circulito
      handleScroll(nativeEvent.contentOffset.x);
      if (slide != viewActive) {
        setViewActive(slide);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* CIRCULOS DE FUEGO*/}

      {/* FIRST SLIDE 0 0 */}
      <View
        style={{
          ...styles.slide1,
          ...styles.bg,
          top: 0 * width + xPos,
          right: 0 * width + xPos,
          zIndex: 1,
        }}
      >
        <View
          style={{
            ...styles.slide1,
            ...styles.bg,
            top: 0 - xPos,
            right: 0 - xPos,
            zIndex: 2,
          }}
        >
          <Text
            className="color-white text-3xl text-center"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            Somos una{"\n"}
            organización sin{"\n"}
            fines de lucro que{"\n"}
            busca ayudar a las{"\n"}
            mascotas a{"\n"}
            encontrar un hogar.
          </Text>
        </View>
      </View>

      {/* SLIDE 2 */}
      <View
        style={{
          ...styles.slide2,
          top: responsiveHell(2, "top", "moving"),
          right: responsiveHell(2, "right", "moving"),
          zIndex: 2,
          overflow: "hidden",
          borderRadius: width,
        }}
        className="bg-yellow"
      >
        <View
          style={{
            ...styles.slide2,
            ...styles.bg,
            top: responsiveHell(2, "top", "static"),
            right: responsiveHell(2, "right", "static"),
            zIndex: 3,
          }}
        >
          <Image
            style={styles.icon}
            source={require("../../images/icon2-welcome.png")}
          />
          <Image
            style={styles.imgbg2}
            source={require("../../images/image-bg2-welcome.png")}
          />

          <Text
            className="color-black text-3xl text-center"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            Podrás adoptar a tu{"\n"}
            mascota soñada{"\n"}o encontrarle un mejor hogar{"\n"}a un gatito
            rescatado.
          </Text>
        </View>
      </View>

      {/* SLIDE 3 */}
      <View
        className="bg-pink"
        style={{
          ...styles.slide3,
          top: responsiveHell(3, "top", "moving"),
          right: responsiveHell(3, "right", "moving"),
          zIndex: 5,
          overflow: "hidden",
          borderRadius: width,
        }}
      >
        <View
          style={{
            ...styles.slide3,
            ...styles.bg,
            top: responsiveHell(3, "top", "static"),
            right: responsiveHell(3, "right", "static"),
            zIndex: 7,
          }}
        >
          <Image
            style={styles.icon}
            source={require("../../images/icon1-icon3-welcome.png")}
          />
          <Text
            className="color-white text-3xl text-center"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            No discriminamos{"\n"}
            por raza y{"\n"}
            priorizamos a los{"\n"}
            que más tiempo{"\n"}
            lleven sin un hogar.
          </Text>
        </View>
      </View>

      {/* SLIDE 4 */}
      <View
        style={{
          ...styles.slide4,
          top: responsiveHell(4, "top", "moving"),
          right: responsiveHell(4, "right", "moving"),
          zIndex: viewActive === 4 ? 13 : 7, //porque sino no deja hacer clicks
          overflow: "hidden",
          borderBottomLeftRadius: width,
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            top: -height / 2 - width * 0.125,
            right: 0 - width * 0.4 - height * 0.511,
            width: height,
            height: height,
            overflow: "hidden",
            zIndex: 8,
          }}
          source={require("../../images/bg3-welcome.png")}
        />

        <View
          style={{
            ...styles.slide4,
            ...styles.bg,
            top: responsiveHell(4, "top", "static"),
            right: responsiveHell(4, "right", "static"),
            zIndex: 15,
          }}
        >
          <ImageBackground
            style={{
              backgroundImage: "linear-gradient",
              backgroundSize: "cover",
            }}
            className="h-full w-full top-0 left-0 absolute z-[-50]"
            source={require("../../images/bg-google.png")}
            blurRadius={0}
          ></ImageBackground>
          <Image
            className="absolute -bottom-20 z-[5]"
            source={require("../../images/pets-png.png")}
          />
        </View>
      </View>

      {/* SCROLL STUFF */}
      <ScrollView
        style={{ zIndex: 14, backgroundColor: "rbga(255,0,0,0.5)" }}
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        horizontal
      >
        <View
          style={{
            width,
          }}
        ></View>
        <View
          style={{
            width,
          }}
        ></View>
        <View
          style={{
            width,
          }}
        ></View>
        <View
          style={{
            width,
          }}
        >
          <GoogleAuth></GoogleAuth>
        </View>
      </ScrollView>

      <Dots page={viewActive - 1} steps={4}></Dots>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
  },
  bg: {
    position: "absolute",
    resizeMode: "contain",
    width,
    height,
    top: -400,
    right: -280,
  },
  icon: {
    position: "absolute",
    top: "1%",
    right: 20,
    width: "16.4%",
    resizeMode: "contain",
  },
  imgbg2: {
    position: "absolute",
    width,
    height: height * 0.3,
    bottom: height * 0.1,
  },
  slide1: {
    position: "absolute",
    width: width * 2,
    height: height * 2,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A302E",
  },

  slide2: {
    width: width * 2,
    height: height * 2,
    position: "absolute",
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  slide3: {
    width: width * 2,
    height: height * 2,
    position: "absolute",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  slide4: {
    width: width * 2,
    height: height * 2,
    position: "absolute",
    zIndex: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A302E",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Roboto_300Light",
  },
  text1: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Roboto_300Light",
  },
  text2: {
    color: "#FFFFFF",
    fontSize: 30,
    fontFamily: "Roboto_300Light",
  },
  text3: {
    color: "#3A302E",
    fontSize: 30,
    fontFamily: "Roboto_300Light",
  },
  wrapDot: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    bottom: 0,
    marginBottom: 40,
    zIndex: 14,
  },
  dotActive: {
    color: "#AB4E68",
    letterSpacing: 20,
    fontSize: 24,
  },
  dot: {
    color: "#ACACAC",
    letterSpacing: 20,
    fontSize: 24,
  },
  container: {
    backgroundColor: "#3A302E",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitles: {
    color: "#FFFFFF",
    textAlign: "center",
    position: "relative",
    top: 10,
    marginBottom: 15,
    marginTop: 10,
    fontWeight: "normal",
    fontSize: 35,
    fontFamily: "Roboto_300Light",
  },
  textSubTitles: {
    top: 20,
    color: "#8F8F8F",
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Roboto_300Light",
  },
  textSubTitlesLogin: {
    top: 20,
    color: "#AB4E68",
    fontWeight: "normal",
    textAlign: "center", //hola que onda?
    fontSize: 35,
    fontFamily: "Roboto_300Light",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    margin: 10,
  },
  googleLogo: {
    width: 50,
    height: 50,
  },
  googleCircle: {
    backgroundColor: "#ACACAC",
    borderRadius: 100,
    width: 90,
    height: 90,
    right: "-10%", //XDXDXDXD
    marginTop: 0,
  },
  divisionLine: {
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    width: "80%",
    backgroundColor: "#ACACAC",
  },
  iconoLogin: {
    height: height * 0.3,
    width: width * 0.7,
    resizeMode: "contain",
  },
});

export default Welcome;
