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
import { TouchableOpacity, Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { retriveUserData } from '../../Redux/Actions/index'
import { url } from "../../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton({ navigation }) {

	const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
		{
			clientId: '328480437483-79s5eannadnniju840oobjm54argemvm.apps.googleusercontent.com',
		},
	);

	const [userData, setUserData] = useState({})
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

	return (<>
		{!userData.email && <TouchableOpacity
			disabled={!request}
			title="Login"
			onPress={() => promptAsync()}
			className="flex flex-row items-center my-[5%] mx-[10%]"
		>
			<Icon name="google" className="w-12 h-12 mr-[20%]" size={50} background={"#ACACAC"} color={"#AB4E68"} />
			<Text className="text-2xl" style={{ fontFamily: 'Roboto_300Light', color: 'white' }}>Login</Text>
		</TouchableOpacity>}



		{userData.email && <TouchableOpacity
			onPress={logoutUser}
			className="flex flex-row items-center my-[5%] mx-[10%]"
		>
			<Icon name="logout" className="w-12 h-12 mr-[20%]" size={50} color={"#FFC733"} />
			<Text className="text-2xl" style={{ fontFamily: 'Roboto_300Light', color: 'white' }}>Cerrar Sesión</Text>
		</TouchableOpacity>}

	</>

	);
}


