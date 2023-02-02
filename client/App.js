import "react-native-gesture-handler";
import React from "react";
import { LoginScreen, RegistrationScreen } from "./src/Components/Register";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import { Image } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Components/Home/Home";
import LandingPage from "./src/Components/LandingPage/LandingPage";
import Welcome from "./src/Components/WelcomePage/WelcomePage";
import Detail from "./src/Components/Detail/Detail";
import RegisterFirstSteps from "./src/Components/Register/Entering/Register_First_Steps";
import RegisterLastSteps from "./src/Components/Register/Entering/Register_Last_Steps";
import UserDetail from "./src/Components/UserDetail/UserDetail";
import { CreatePet } from "./src/Components/CreatePet/CreatePet";
import SolicitudPet from "./src/Components/Detail/SolicitudPet";
import { Provider } from "react-redux";
import store from "./src/Redux/Store";
import EditPet from "./src/Components/EditPet/EditPet";
import Map from "./src/Components/Map/Map";
import EditProfile from "./src/Components/EditProfile/EditProfile";
import { ProfileOthers } from "./src/Components/UserDetail/profileOthers";
import PushNotification from "./src/firebase/pushNotifications";
import axios from "axios";
import { useFonts } from "expo-font";
import { Roboto_300Light } from "@expo-google-fonts/roboto";
import PersistentLogin from "./src/PersistentLogin.jsx";
import AdminPanel from "./src/Components/AdminPanel/AdminPanel";
import Reports from "./src/Components/AdminPanel/Reports";

axios.defaults.baseURL = "http://100.25.46.52:8080/pet";

const Stack = createStackNavigator();

const Logo = () => (
  <Image
    className="w-16 h-14 mx-3"
    source={require("../client/src/images/logo-black.png")}
  />
);

//Inicio componente App:
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
  });

  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <PersistentLogin />
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

          <Stack.Screen
            name="Solicitud de Adopcion"
            component={SolicitudPet}
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          />

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
            name="CreatePet"
            component={CreatePet}
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Publicar mascota",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="EditPet"
            component={EditPet}
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Editar mascota",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Editar Perfil",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileOthers}
            options={{
              headerTransparent: true,
              headerShadowVisible: false,
              headerTintColor: "#fff",
              title: null,
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="AdminPanel"
            component={AdminPanel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reports"
            component={Reports}
            options={{ headerShown: false }}
          />

          {/* =================================== */}
        </Stack.Navigator>
      </NavigationContainer>
      <PushNotification />
    </Provider>
  );
}
