import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import GoogleImage from "../../images/Google.svg"

const { width, height } = Dimensions.get("window");

const Welcome = ({ navigation }) => {
  const [viewActive, setViewActive] = useState(1);
  

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide =
        Math.round(
          nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
        ) + 1;
      if (slide != viewActive) {
        setViewActive(slide);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={({ nativeEvent }) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
      >
        <View style={styles.slide1}>
          <Image
            style={styles.bg}
            source={require("../../images/bg1-welcome.png")}
          />
          <Image
            style={styles.icon}
            source={require("../../images/icon1-icon3-welcome.png")}
          />
          <Text style={styles.text}>Somos una</Text>
          <Text style={styles.text}>organización sin</Text>
          <Text style={styles.text}>fines de lucro que</Text>
          <Text style={styles.text}>busca ayudar a las</Text>
          <Text style={styles.text}>mascotas a</Text>
          <Text style={styles.text}>encontrar un hogar.</Text>
        </View>
        <View style={styles.slide2}>
          <Image
            style={styles.bg}
            source={require("../../images/bg2-welcome.png")}
          />
          <Image
            style={styles.icon}
            source={require("../../images/icon2-welcome.png")}
          />
          <Image
            style={styles.imgbg2}
            source={require("../../images/image-bg2-welcome.png")}
          />
          <Text style={styles.text}>Podrás adoptar a tu</Text>
          <Text style={styles.text}>mascota soñada o</Text>
          <Text style={styles.text}>encontrarle un</Text>
          <Text style={styles.text}>mejor hogar a un</Text>
          <Text style={styles.text}>gatito rescatado.</Text>
        </View>
        <View style={styles.slide3}>
          <Image
            style={styles.bg}
            source={require("../../images/bg3-welcome.png")}
          />
          <Image
            style={styles.icon}
            source={require("../../images/icon1-icon3-welcome.png")}
          />
          <Text style={styles.text}>No discriminamos</Text>
          <Text style={styles.text}>por raza y</Text>
          <Text style={styles.text}>priorizamos a los</Text>
          <Text style={styles.text}>que más tiempo</Text>
          <Text style={styles.text}>lleven sin un hogar.</Text>
        </View>
        <View style={styles.slide4}>
          <Image
              style={styles.icon}
              source={require("../../images/icon1-icon3-welcome.png")}
          />
          <Text style={styles.textTitles}>Registrate</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterFirstSteps')}>
            <View style={styles.googleCircle}>
							<GoogleImage width={86} height={86}/>
            </View>
          </TouchableOpacity>
          <View style={styles.divisionLine}></View>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.textSubTitles}>Ingresar como invitado</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      <View style={styles.wrapDot}>
        <Text style={viewActive === 1 ? styles.dotActive : styles.dot}>●</Text>
        <Text style={viewActive === 2 ? styles.dotActive : styles.dot}>●</Text>
        <Text style={viewActive === 3 ? styles.dotActive : styles.dot}>●</Text>
        <Text style={viewActive === 4 ? styles.dotActive : styles.dot}>●</Text>
      </View>
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
    top: 20,
    right: 20,
    width: 50,
    resizeMode: "contain",
  },
  imgbg2: {
    position: "absolute",
    width,
    height: height * 0.30,
    bottom: 0,
  },
  slide1: {
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A302E",
  },

  slide2: {
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AB4E68",
  },
  slide3: {
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC733",
  },
  slide4: {
    width,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A302E",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  wrapDot: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    bottom: 0,
    marginBottom: 40,
  },
  dotActive: {
    color: "#AB4E68",
    letterSpacing: 20,
    fontSize: 15,
  },
  dot: {
    color: "#ACACAC",
    letterSpacing: 20,
    fontSize: 15,
  },
  container: {
    backgroundColor: "#3A302E",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitles: {
    color: "#FFFFFF",
    textAlign: 'center',
    position: 'relative',
    top: 10,
    marginBottom: 40,
    fontWeight: "normal",
    fontSize: 35,
  },
  textSubTitles: {
    top: 20,
    color: "#8F8F8F",
    fontWeight: "normal",
    textAlign: 'center',
    fontSize: 25,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
  },
  googleLogo: {
    width: 50,
    height: 50,
  },
  googleCircle: {
    top: 10,
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ACACAC',
    width: 86,
    height: 86,
    borderRadius: 100
  },
  divisionLine: {
    marginTop: 20,
    marginBottom: 20,
    height: 1,
    width: "80%",
    backgroundColor: "#ACACAC",
  }
});

export default Welcome;
