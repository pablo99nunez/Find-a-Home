import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";

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
				style={styles.icon}
				// source={require("../../../images/logo-black.png")}
			/>
			<View style={styles.container}><View style={styles.divisionLine}></View>
				<Text style={styles.textTitles}>¡Ya casi!</Text>
				<View style={styles.divisionLine}></View>

				<Text style={styles.textSubTitles}>Debes registrarte para</Text>
				<Text style={styles.textSubTitles}>poder adoptar una</Text>
				<Text style={styles.textSubTitles}>mascota</Text>
				
				<TouchableOpacity onPress={() => navigation.navigate('RegisterLastStepsAdopting')}>
           			<View style={styles.googleCircle}>
						<Image style={styles.googleLogo} source={{ uri: ("https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png") }} >
						</Image>
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
		position: "absolute",
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