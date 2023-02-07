import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from 'react-native';
import firebase from "../../firebase/firebase-config";
import { TouchableOpacity, Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton() {

	const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
		{
			clientId: '328480437483-79s5eannadnniju840oobjm54argemvm.apps.googleusercontent.com',
		},
	);

	React.useEffect(() => {
		if (response?.type === 'success') {
			const { id_token } = response.params;
			const auth = getAuth();
			const credential = GoogleAuthProvider.credential(id_token);
			signInWithCredential(auth, credential);
			console.log(response)
		}
	}, [response]);

	function logoutUser() {
		const auth = getAuth(firebase);
		signOut(auth)
			.then(() => {
				// clear session storage
				AsyncStorage.clear(() => {
					AsyncStorage.clear();
					navigation.navigate("LandigPage");
				});
			})
			.catch((error) => {
				// An error happened.
				console.error("⚠️ Error -> 🚨 UserDetail -> 🔔logoutUser: " + error)

			});
	}

	return (<>

		<Button
			disabled={!request}
			title="Login"
			onPress={() => {
				promptAsync();
			}}
		/>
		<TouchableOpacity
			onPress={logoutUser}
			className="flex flex-row items-center my-[5%] mx-[10%]"
		>
			<Icon name="logout" className="w-12 h-12 mr-[20%]" size={50} color={"#FFC733"} />
			<Text className="text-2xl" style={{ fontFamily: 'Roboto_300Light', color: 'white' }}>Cerrar Sesión</Text>
		</TouchableOpacity>

	</>

	);
}