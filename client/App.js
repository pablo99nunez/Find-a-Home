//aca hago cagadas
import "react-native-gesture-handler";
import React from "react";
import { LoginScreen, RegistrationScreen } from "./src/screens";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

//fin dd cagadas
import { Image } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Components/Home/Home";
import LandingPage from "./src/Components/LandingPage/LandingPage";
import Welcome from "./src/Components/WelcomePage/WelcomePage";
import Detail from "./src/Components/Detail/Detail";
import RegisterFirstSteps from "./src/Components/Register/Entering/Register_First_Steps";
import RegisterLastSteps from "./src/Components/Register/Entering/Register_Last_Steps";
import GoogleRegister from "./src/Components/Register/Adopting/Google_Register";
import RegisterFirstStepsAdopting from "./src/Components/Register/Adopting/Register_First_Steps";
import RegisterLastStepsAdopting from "./src/Components/Register/Adopting/Register_Last_Steps";
import UserDetail from "./src/Components/UserDetail/UserDetail";
import { CreatePet } from "./src/Components/CreatePet/CreatePet";
import SolicitudPet from "./src/Components/Detail/SolicitudPet";
import { Provider } from "react-redux";
import store from "./src/Redux/Store";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import EditPet from "./src/Components/EditPet/EditPet";
import Map from "./src/Components/Map/Map";

import axios from "axios";

import { useFonts } from "expo-font";

import { Roboto_300Light } from "@expo-google-fonts/roboto";
import { ScreenStackHeaderRightView } from "react-native-screens";

axios.defaults.baseURL = "http://100.26.168.38:8080/pet";

const Stack = createStackNavigator();

const Logo = () => (
  <Image
    className="w-16 h-14 mx-3"
    source={require("../client/src/images/logo-black.png")}
  />
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
  });

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LandigPage"
            component={LandingPage}
            initialParams={{ fromChild: "Initial" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Solicitud de Adopcion" component={SolicitudPet} />

          <Stack.Screen
            name="RegisterFirstSteps"
            component={RegisterFirstSteps}
            options={{
              headerStyle: { backgroundColor: "#FFC733" },
              headerShadowVisible: false,
              headerTintColor: "#000",
              title: "",
              headerBackTitle: null,
              headerBackTitleVisible: false,
              headerRight: (props) => <Logo {...props} />,
            }}
          />
          <Stack.Screen
            name="RegisterLastSteps"
            component={RegisterLastSteps}
            options={{
              headerStyle: { backgroundColor: "#FFC733" },
              headerShadowVisible: false,
              headerTintColor: "#000",
              title: "",
              headerBackTitle: null,
              headerBackTitleVisible: false,
              headerRight: (props) => <Logo {...props} />,
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerStyle: { backgroundColor: "#3A302E" },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              title: "Ingresar a tu cuenta",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{
              headerStyle: { backgroundColor: "#3A302E" },
              headerShadowVisible: false,
              headerTintColor: "#fff",
              title: "Registro",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          {/* =================================== */}

          <Stack.Screen
            name="GoogleRegister"
            component={GoogleRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterFirstStepsAdopting"
            component={RegisterFirstStepsAdopting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterLastStepsAdopting"
            component={RegisterLastStepsAdopting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePet"
            component={CreatePet}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EditPet"
            component={EditPet}
            options={{ headerShown: false }}
          />
          {/* =================================== */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
