import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, Text, Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//¿¿Why you import Keyboard Aware Scroll View??

import { SelectList } from "react-native-dropdown-select-list";
import States from "../States.json"
import Localities from "../Localities.json"


export default function RegisterFirstSteps({ navigation }) {

	const [userInput, setUserInput] = useState({ 
		telefono: "", 
		pais: "", 
		provincia: "", 
		departamento: "" 
	})

	return (

		<ScrollView>
				<Image
				className="absolute top-[16px] right-[22] z-[1]"
				source={require("../../../images/logo-black.png")}
			/>
			<View className="h-screen items-center justify-center bg-[#FFC733]">
				<Text className="absolute top-[121px] w-auto mx-auto font-roboto font-light text-[90px] leading-auto flex items-center text-center">
					¡Bienvenido!
				</Text>
				<Text className="absolute top-[242px] w-[430px] mx-auto px-8 font-roboto font-[0] text-[38px] leading-auto flex items-center text-center">				
					Solo unos datos más y podrás comenzar:
				</Text>

				<View className="w-[466px] mt-32">
				 	<Text className="relative text-[26px] font-[23px]">
						Teléfono:
					</Text>		
						<TextInput						
							className="bg-[#1E1E1E] text-[#7E7E7E] rounded-[11px] w-[466px] h-[46px] mx-auto pl-[9px] text-[18px]"						
							value={userInput}							
							placeholder={"   011 555-5555"}
							placeholderTextColor="#ffffff50"
							onChangeText={(text) => setUserInput({ ...userInput, telefono: text })}
						/>
				</View>

				<View className="w-[466px]">
				 	<Text className="relative text-[26px] font-[23px]">
						Pais:
					</Text>		
						<SelectList 
							data={[{key:"Argentina", value:"Argentina"}]}
							setSelected={(val) => setUserInput({...userInput, pais: val})}
							placeholder="Pais"	
							search={false}
							boxStyles={{backgroundColor:"#1E1E1E"}}
							inputStyles={{color:"#7E7E7E", fontSize: 18}}
							dropdownStyles={{backgroundColor:"#2E2E2E"}}
							dropdownTextStyles={{color:"#6E6E6E", fontSize: 18}}							
						/>
				</View>

				<View className="w-[466px]">
				 	<Text className="relative text-[26px] font-[23px]">
						Provincia:
					</Text>		
						<SelectList 
							data={States}
							setSelected={(val) => setUserInput({...userInput, provincia: val})}
							placeholder="Provincia"	
							search={false}
							boxStyles={{backgroundColor:"#1E1E1E"}}
							inputStyles={{color:"#7E7E7E", fontSize: 18}}
							dropdownStyles={{backgroundColor:"#2E2E2E"}}
							dropdownTextStyles={{color:"#6E6E6E", fontSize: 18}}							
						/>
				</View>

				<View className="w-[466px]">
				 	<Text className="relative text-[26px] font-[23px]">
						Departamento:
					</Text>		
						<SelectList 
							data={Localities.filter((ele) => ele.key == userInput.provincia)}
							setSelected={(value) => setUserInput({...userInput, departamento: value})}
							placeholder="Departamento"	
							// search={false}
							boxStyles={{backgroundColor:"#1E1E1E"}}
							inputStyles={{color:"#7E7E7E", fontSize: 18}}
							dropdownStyles={{backgroundColor:"#2E2E2E"}}
							dropdownTextStyles={{color:"#6E6E6E", fontSize: 18}}							
						/>
				</View>

			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate("RegisterLastSteps", userInput)}
			>
				<Text className="absolute bottom-[50px] right-[28px] text-[36px]">
					Continue
				</Text>
			</TouchableOpacity>

		</ScrollView>




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