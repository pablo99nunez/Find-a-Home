import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default function Register({ navigation }) {
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
				source={require("../../../images/logo-black.png")}
			/>
			<View style={styles.container}><View style={styles.divisionLine}></View>
				<Text style={styles.textTitles}>¡Bienvenido!</Text>
				<View style={styles.divisionLine}></View>
				<Text style={styles.textSubTitles}>Solo unos datos más y</Text>
				<Text style={styles.textSubTitles}>podrás comenzar:</Text>

				<View>
					<Text style={styles.text}>Telefono</Text>
					<TextInput
						style={styles.input}
						value={userInput}
						placeholder={"   011 555-5555"}
						placeholderTextColor="#ffffff50"
						onChangeText={(text) => setUserInput({ ...userInput, telefono: text })}
					/>
				</View>


				<View>
					<Text style={styles.text}>País:</Text>
					<Picker style={styles.input}
						ref={pickerRef}
						selectedValue={userInput.pais}
						onValueChange={(itemValue, itemIndex) =>
							setUserInput({ ...userInput, pais: itemValue })
						}>
						<Picker.Item label="Argentina" value="Argentina" />
						<Picker.Item label="Francia" value="Francia" />
						<Picker.Item label="Croacia" value="Croacia" />
					</Picker>
				</View>

				<View>
					<Text style={styles.text}>Provincia:</Text>
					<Picker style={styles.input}
						ref={pickerRef}
						selectedValue={userInput.provincia}
						onValueChange={(itemValue, itemIndex) =>
							setUserInput({ ...userInput, provincia: itemValue })
						}>
						<Picker.Item label="La rioja" value="La rioja" />
						<Picker.Item label="Mendoza" value="Mendoza" />
						<Picker.Item label="Buenos Aires" value="Buenos Aires" />
					</Picker>
				</View>

				<View>
					<Text style={styles.text}>Departamento:</Text>
					<Picker style={styles.input}
						ref={pickerRef}
						selectedValue={userInput.departamento}
						onValueChange={(itemValue, itemIndex) =>
							setUserInput({ ...userInput, departamento: itemValue })
						}>
						<Picker.Item label="depto1" value="depto1" />
						<Picker.Item label="depto2" value="depto2" />
						<Picker.Item label="CABA" value="CABA" />
					</Picker>
				</View>


				<View style={styles.divisionLine}></View>
				<View style={styles.divisionLine}></View>
			</View><TouchableOpacity
				onPress={() => navigation.navigate("RegisterLastSteps", userInput)}
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

	}
})