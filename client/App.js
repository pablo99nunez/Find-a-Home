//aca hago cagadas
import 'react-native-gesture-handler';
import React from 'react'
import { LoginScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

//fin dd cagadas

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

const Stack = createStackNavigator();

export default function App() {
  return (
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
          name="Detail"
          component={Detail}
          options={{ headerShown: false }}
          />

        <Stack.Screen
          name="UserDetail"
          component={UserDetail}
          options={{ headerShown: false }}
          />
          
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
       

        <Stack.Screen
          name="RegisterFirstSteps"
          component={RegisterFirstSteps}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterLastSteps"
          component={RegisterLastSteps}
          options={{ headerShown: false }}
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

        {/* =================================== */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
