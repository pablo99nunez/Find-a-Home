import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { LoginScreen, RegistrationScreen } from "./src/Components/Register";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

import { Image, LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Components/Home/Home";
import Welcome from "./src/Components/WelcomePage/WelcomePage";
import Detail from "./src/Components/Detail/Detail";
import RegisterFirstSteps from "./src/Components/Register/Entering/Register_First_Steps";
import RegisterLastSteps from "./src/Components/Register/Entering/Register_Last_Steps";
import RegisterFirstStepsGoogle from "./src/Components/Register/Entering/Register_First_Steps_google";
import RegisterLastStepsGoogle from "./src/Components/Register/Entering/Register_Last_Steps_google";
import UserDetail from "./src/Components/UserDetail/UserDetail";
import { CreatePet } from "./src/Components/CreatePet/CreatePet";
import SolicitudPet from "./src/Components/Detail/SolicitudPet";
import { Provider } from "react-redux";
import store from "./src/Redux/Store";
import EditPet from "./src/Components/EditPet/EditPet";
import Map from "./src/Components/Map/Map";
import EditProfile from "./src/Components/EditProfile/EditProfile";
import { ProfileOthers } from "./src/Components/UserDetail/ProfileOthers";
import PushNotification from "./src/firebase/pushNotifications";
import { useFonts } from "expo-font";
import { Roboto_300Light, Roboto_100Thin } from "@expo-google-fonts/roboto";
import PersistentLogin from "./src/PersistentLogin.jsx";
import AdminPanel from "./src/Components/AdminPanel/AdminPanel";
import Reports from "./src/Components/AdminPanel/Reports";
import RegisterMap from "./src/Components/Register/Entering/RegisterMap";
import Usuarios from "./src/Components/AdminPanel/Usuarios";
import FormPets from "./src/Components/CreatePet/FormPetsTwo";
import MercadoPago from "./src/Components/MercadoPago/MercadoPago";
import Prices from "./src/Components/Donations/Prices";
import { Notifications } from "./src/Components/UserDetail/Notifications";

import GoogleButton from "./src/Components/Buttons/GoogleAuth";

import { UserSolicitudes } from "./src/Components/UserDetail/UserSolicitudes";

import UserPets from "./src/Components/AdminPanel/UserPets";
import Donate from "./src/Components/AdminPanel/Donate";
import ReviewQueMeDieron from "./src/Components/UserDetail/ReviewsQueMeDieron";
import { SafeAreaView } from "react-native-safe-area-context";
LogBox.ignoreLogs([
  `AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage`,
]);
LogBox.ignoreLogs([
  `Require cycle: src/firebase/authentication.js -> src/Redux/Actions/index.js -> src/firebase/authentication.js`,
]);

const Stack = createStackNavigator();

const Logo = () => (
  <Image
    className="w-16 h-14 mx-3"
    source={require("../client/src/images/logo-black.png")}
  />
);

//Inicio componente App :
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_100Thin,
  });
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "rgb(255, 0, 0)",
    },
  };
  if (!fontsLoaded) return null;
  return (
    <Provider store={store}>
      <PersistentLogin />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Google"
            component={GoogleButton}
            initialParams={{ fromChild: "Initial" }}
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
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Ver mascotas en el mapa",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
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
            name="Notificaciones"
            component={Notifications}
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerBackTitleVisible: false,
              headerTintColor: "#000",
            }}
          />
          <Stack.Screen
            name="UserSolicitudes"
            component={UserSolicitudes}
            options={{
              headerStyle: { backgroundColor: "#d9d9d9" },
              headerBackTitleVisible: false,
              headerTintColor: "#000",
              title: "Mis Solicitudes",
            }}
          />

          <Stack.Screen
            name="RegisterFirstSteps"
            component={RegisterFirstSteps}
            options={{
              headerStyle: { backgroundColor: "#FFC733" },
              headerShadowVisible: false,
              headerTintColor: "#000",
              title: null,
              headerBackTitle: null,
              headerBackTitleVisible: false,
              headerRight: (props) => <Logo {...props} />,
            }}
          />
          <Stack.Screen
            name="RegisterFirstStepsGoogle"
            component={RegisterFirstStepsGoogle}
            options={{
              headerStyle: { backgroundColor: "#FFC733" },
              headerShadowVisible: false,
              headerTintColor: "#000",
              title: null,
              headerBackTitle: null,
              headerBackTitleVisible: false,
              headerRight: (props) => <Logo {...props} />,
            }}
          />
          <Stack.Screen
            name="RegisterMap"
            component={RegisterMap}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterLastSteps"
            component={RegisterLastSteps}
            options={{
              headerStyle: { backgroundColor: "#FFC733" },
              headerShadowVisible: false,
              headerTintColor: "#000",
              title: null,
              headerBackTitle: null,
              headerBackTitleVisible: false,
              headerRight: (props) => <Logo {...props} />,
            }}
          />
          <Stack.Screen
            name="RegisterLastStepsGoogle"
            component={RegisterLastStepsGoogle}
            options={{
              headerStyle: { backgroundColor: "#FFC733" },
              headerShadowVisible: false,
              headerTintColor: "#000",
              title: null,
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
            options={{
              headerStyle: { backgroundColor: "#f1f1f1" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Panel de administrador",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Reports"
            component={Reports}
            options={{
              headerStyle: { backgroundColor: "#f1f1f1" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Reportes",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Donate"
            component={Donate}
            options={{
              headerStyle: { backgroundColor: "#f1f1f1" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Donaciones",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="Usuarios"
            component={Usuarios}
            options={{
              headerStyle: { backgroundColor: "#f1f1f1" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Usuarios",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="FormPets"
            component={FormPets}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserPets"
            component={UserPets}
            options={{
              headerStyle: { backgroundColor: "#f1f1f1" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Mascotas del usuario",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="Prices"
            component={Prices}
            options={{
              headerStyle: { backgroundColor: "#009ee3" },
              headerShadowVisible: false,
              headerTintColor: "#ffffff",
              title: "Ayudanos a mejorar",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="MisReseñas"
            component={ReviewQueMeDieron}
            options={{
              headerStyle: { backgroundColor: "#ACACAC" },
              headerShadowVisible: false,
              headerTintColor: "#AB4E68",
              title: "Reseñas que te dieron",
              headerBackTitle: null,
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen name="MercadoPago" component={MercadoPago} />

          {/* =================================== */}
        </Stack.Navigator>
      </NavigationContainer>
      <PushNotification />
    </Provider>
  );
}
