import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";


const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const RegisterLastSteps = ({ route, navigation }) => {

	const { telefono, pais, departamento, provincia } = route.params
	const [userNewInput, setuserNewInput] = useState({ telefono, pais, departamento, provincia, condiciones: "" })
	const [checkState, setCheckState] = useState({})
	const [accepted, setAccepted] = useState(false);
	const HandleCheck = (option) => {
		setCheckState({ ...checkState, [option]: !checkState[option] })
		setuserNewInput({ ...userNewInput, [option]: !checkState[option] })
	}


	return (


		<View className="flex flex-col flex-row-6 h-screen items-center space-y-3" style={styles.container}>


			<View className="items-end w-full" style={styles.divisionPanel}>
				<Image
					style={styles.icon}
					source={require("../../../images/logo-black.png")}
				/>
			</View>


			<View className="w-full" style={styles.divisionPanel}>
				<Text style={styles.textTitles}>¡Bienvenido!</Text>
			</View>


			<View className="w-full" style={styles.divisionPanel}>
				<Text style={styles.textSubTitles}>¿Que condiciones</Text>
				<Text style={styles.textSubTitles}>puedes ofrecer a tus</Text>
				<Text style={styles.textSubTitles}>mascotas?</Text>
			</View>


			<View className="w-full items-start" style={styles.divisionPanel}>
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
			</View>
			<View className="flex flex-row justify-center content-center items-start w-full" style={styles.divisionPanel}>
				<View className="w-7 h-7" style={styles.divisionPanel}>
					<TouchableOpacity onPress={() => setAccepted(!accepted)}>
						<Text style={accepted ? styles.termIsActive : styles.termInactive}>	{accepted && "✔"}
						</Text>
					</TouchableOpacity>
				</View>

				<View className="w-full flex flex-row h-7" style={styles.divisionPanel}><Text>Acepto</Text>
					<TouchableOpacity onPress={() => console.log('terms link here')}>
						<Text className="text-[#AB4E68]"> Terminos y condiciones</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View className="items-end w-full" style={styles.divisionPanel}>

				<TouchableOpacity
					onPress={() => navigation.navigate("Home")}>
					<Text style={styles.next}>
						Continue
					</Text>
				</TouchableOpacity>

			</View>







		</View>



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
	},
	textTitles: {
		color: "#000",
		textAlign: 'center',
		fontSize: 55,
		marginTop: 10,
	},
	textSubTitles: {
		color: "#000",
		textAlign: 'left',
		alignSelf: 'flex-start',
		fontSize: 30,
	},

	divisionPanel: {
		marginTop: 10,

	},
	checkIsActive: {
		backgroundColor: '#AB4E68',
		color: "#FFF",
		borderRadius: 35,
		textAlign: 'center',
		fontSize: 20,
		padding: 10,
		margin: 2,
	},
	checkInactive: {
		backgroundColor: '#d9d9d947',
		color: "#0000004e",
		borderRadius: 35,
		textAlign: 'center',
		fontSize: 20,
		padding: 10,
		margin: 2,
	},
	termIsActive: {
		backgroundColor: '#AB4E68',
		color: "#FFF",
		borderWidth: 2,
		borderColor: "#AB4E68",
		textAlign: 'center',
		fontSize: 20,
		borderRadius: 5,
		margin: 2,
		overflow: "visible",
	},
	termInactive: {
		backgroundColor: '#d9d9d971',
		color: "#0000004e",
		borderWidth: 2,
		borderColor: "#AB4E68",
		textAlign: 'center',
		fontSize: 20,
		borderRadius: 5,
		margin: 2,
	}
})

export default RegisterLastSteps;