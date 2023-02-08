import React from 'react';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native';
import firebase from "../../firebase/firebase-config";
import { TouchableOpacity, Text, View, Image, ImageBackground, } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { retriveUserData } from '../../Redux/Actions/index'
import { url } from "../../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from '@expo/vector-icons/FontAwesome';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton({ navigation }) {

	const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
		{
			clientId: '328480437483-79s5eannadnniju840oobjm54argemvm.apps.googleusercontent.com',
		},
	);

	const [userData, setUserData] = useState({})
	const [loading, setLoading] = useState(false)
	React.useEffect(() => {

		if (response?.type === 'success') {
			const { id_token } = response.params;
			const auth = getAuth();
			const credential = GoogleAuthProvider.credential(id_token);
			signInWithCredential(auth, credential)
				.then(async res => {
					const result = await retriveUserData()
					const token = await auth.currentUser.getIdToken();
					const { name, email, photoURL } = result.user;
					setUserData({ name, email, photoURL, token })
				})
				.catch(error => error)

		}
	}, [response]);

	React.useEffect(() => {
		if (response?.type === 'success' && userData.email) {
			try {
				(async function () {
					const response = await axios.get(url + "/user/profile", {
						headers: {
							Authorization: `Bearer ${userData?.token && userData.token}`,
						},
					});
				})()
					.then(res => goToRegister(true))
					.catch(error => goToRegister(false))
			}
			catch (error) { }
		}
	}, [userData]);

	async function goToRegister(userExistInDb) {
		userExistInDb
			? navigation.navigate("Home")
			: navigation.navigate("RegisterFirstStepsGoogle", userData)

	}
	function logoutUser() {
		setUserData({})
		const auth = getAuth(firebase);
		signOut(auth)
			.then(() => {
				// clear session storage
				AsyncStorage.clear(() => {
					AsyncStorage.clear();
				});
			})
			.catch((error) => {
				// An error happened.
				console.error("⚠️ Error -> 🚨 UserDetail -> 🔔logoutUser: " + error)

			});
	}

	return (<View className="h-full min-w-full relative">
		<ImageBackground style={{
			backgroundImage: "linear-gradient",
			backgroundSize: "cover",
		}}
			className="h-full w-full"
			source={require('../../images/bg-google.png')}
			blurRadius={0}>
			{!loading && <TouchableOpacity
				disabled={!request}
				title="Login"
				// onPress={() => promptAsync()}
				className="flex flex-col items-center justify-between content-around m-auto"
			><View className="flex flex-row items-center justify-between content-around m-auto">
					<Image className="h-32 w-32 justify-self-start my-16 rounded-full z-10"
						source={require("../../images/LOGO-1024PX.png")}
					/></View>

				<View>
					<FontAwesome.Button name="google" onPress={() => promptAsync()} backgroundColor="#FFC733" style={{ fontFamily: "Roboto" }}>
						Login with Google
					</FontAwesome.Button>
					<View className="h-32 text-center my-5 text-[#FFC733]">
						<Text className="text-center text-[#FFC733]">Accedé a Find A Home</Text>
						<Text className="text-center text-[#FFC733]">desde tu cuenta de Google</Text>
					</View>
				</View>


			</TouchableOpacity>}

			<Image
				className="absolute top-[65%]"
				source={require("../../images/pets-png.png")}
			/>

		</ImageBackground>
	</View>

	);
}


