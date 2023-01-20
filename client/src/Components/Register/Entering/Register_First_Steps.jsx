import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function RegisterFirstSteps({ navigation }) {

	const [userInput, setUserInput] = useState({ telefono: "", pais: "", provincia: "", departamento: "" })
	const pickerRef = useRef();

	function open() {
		pickerRef.current.focus();
	}

	function close() {
		pickerRef.current.blur();
	}


	return (

		<View className="flex flex-col" style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always">

				<View className="items-end" style={styles.divisionPanel}>
					<Image
						style={styles.icon}
						source={require("../../../images/logo-black.png")}
					/>
				</View>


				<View className="items-end" style={styles.divisionPanel}>
					<Text style={styles.textTitles}>¡Bienvenido!</Text>
					<Text style={styles.textSubTitles}>Solo unos datos más y</Text>
					<Text style={styles.textSubTitles}>podrás comenzar:</Text>
				</View>

				<View style={styles.divisionPanel}>

					<Text style={styles.text}>Telefono</Text>
					<TextInput
						style={styles.input}
						value={userInput}
						placeholder={"   011 555-5555"}
						placeholderTextColor="#ffffff50"
						onChangeText={(text) => setUserInput({ ...userInput, telefono: text })}
					/>

				</View>


				<View style={styles.divisionPanel}>
					<Text style={styles.text}>País:</Text>
					<Picker style={styles.inputPicker}
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


				<View style={styles.divisionPanel}>
					<Text style={styles.text}>Provincia:</Text>
					<Picker style={styles.inputPicker}
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


				<View style={styles.divisionPanel}>
					<Text style={styles.text}>Departamento:</Text>
					<Picker style={styles.inputPicker}
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
			</KeyboardAwareScrollView>
			<View className="items-end mt-10" style={styles.divisionPanel}>

				<TouchableOpacity
					onPress={() => navigation.navigate("RegisterLastSteps", userInput)}
				><Text style={styles.next}>Continue</Text></TouchableOpacity>
			</View>



		</View>




	)
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flex: 1,
		alignItems: 'center',
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
		alignSelf: 'center',
		fontSize: 55,
		margin: 10,
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
	inputPicker: {
		backgroundColor: '#1E1E1E',
		color: "#FFF",
		fontSize: 25,
		borderWidth: 1,
		borderColor: 'gray',
		padding: 1,

	},
	divisionPanel: {
		width: "95%",
	},

})