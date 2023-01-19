import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const RegisterLastSteps = ({ route }) => {
	const { telefono, pais, departamento, provincia } = route.params
	const [userNewInput, setuserNewInput] = useState({ telefono, pais, departamento, provincia, condiciones: "" })
	const [checkState, setCheckState] = useState({})
	const HandleCheck = (option) => {
		setCheckState({ ...checkState, [option]: !checkState[option] })
		setuserNewInput({ ...userNewInput, [option]: !checkState[option] })
	}
	console.log(userNewInput)
	return (
		<ScrollView>
			<Image
				style={styles.icon}
				source={require("../../../images/logo-black.png")}
			/>
			<View style={styles.container}>
				<View style={styles.divisionLine}></View>
				<TouchableOpacity onPress={() => HandleCheck("Techo")}>
					<Text style={checkState.Techo ? styles.checkIsActive : styles.checkInactive}>Techo</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => HandleCheck("AlimentoBalanceado")}>
					<Text style={checkState.AlimentoBalanceado ? styles.checkIsActive : styles.checkInactive}>Alimento Balanceado</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => HandleCheck("PaseosDiarios")}>
					<Text style={checkState.PaseosDiarios ? styles.checkIsActive : styles.checkInactive}>Paseos Diarios</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => HandleCheck("Vacunas")}>
					<Text style={checkState.Vacunas ? styles.checkIsActive : styles.checkInactive}>Vacunas</Text>
				</TouchableOpacity>

				<View style={styles.divisionLine}></View>
				<View style={styles.divisionLine}></View>
			</View><TouchableOpacity
				onPress={() => console.log("Navigate")}
			><Text style={styles.next}>Continue</Text></TouchableOpacity>

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
	checkIsActive: {
		backgroundColor: '#AB4E68',
		textAlign: 'center',
		color: "#FFF",
		fontSize: 25,
		minWidth: 90,
		height: 55,
		borderRadius: 35,
		padding: 10,
		margin: 10,
	},
	checkInactive: {
		backgroundColor: '#d9d9d971',
		color: "#0000004e",
		fontSize: 25,
		height: 55,
		textAlign: 'center',
		minWidth: 90,
		borderRadius: 35,
		padding: 10,
		margin: 10,
	}
})

export default RegisterLastSteps;