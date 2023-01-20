import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import GoogleImage from "../../../images/Google.svg"

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function GoogleRegister({ navigation }) {

	const [userInput, setUserInput] = useState({ telefono: "", pais: "", provincia: "", departamento: "" })
	const pickerRef = useRef();

	function open() {
		pickerRef.current.focus();
	}

	function close() {
		pickerRef.current.blur();
	}


	return (
		<ScrollView>
			<Image
				className="absolute top-[16px] right-[22] z-[1]"
				source={require("../../../images/logo-black.png")}
			/>
			<View className="h-screen items-center justify-center bg-[#FFC733]">
				<Text className="absolute top-[121px] w-[230px] mx-auto font-roboto font-light text-[64px] leading-[75px] flex items-center text-center">¡Ya casi!</Text>
				<Text className="absolute top-[217px] w-[330px] mx-auto px-8 font-roboto text-[28px] font-light leading-[33px] flex items-center text-center">
					Debes registrarte para poder adoptar una mascota
				</Text>
				<TouchableOpacity>
					<View>
						<GoogleImage width={94} height={94}/>
					</View>					
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 18,
		width: WIDTH,
		height: HEIGHT,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFC733',
	},
	icon: {
		position: "relative",
		top: 0,
		right: 0,
		width: 50,
		resizeMode: "contain",
	},
	text: {
		color: '#000',
		fontSize: 20,
	},
	next: {
		color: '#000',
		fontSize: 30,
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: 10,
	},
	textTitles: {
		color: "#000",
		textAlign: 'center',
		fontSize: 55,
	},
	textSubTitles: {
		color: "#000",
		textAlign: 'left',
		alignSelf: 'flex-start',
		fontSize: 30,
	},
	input: {
		backgroundColor: '#1E1E1E',
		color: "#FFF",
		fontSize: 25,
		width: 350,
		height: 40,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: 'gray',
		padding: 5,
		margin: 10,
	},
	divisionLine: {
		marginTop: 20,
		marginBottom: 20,
		height: 1,
		width: "80%",
	},
	googleCircle: {
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ACACAC',
		width: 66,
		height: 66,
		borderRadius: 100
	},
})