import React, { useState, useRef } from "react";
import { Picker } from '@react-native-picker/picker';
import { View, 
	Text,
	 Dimensions,
	  StyleSheet,
	   ScrollView,
	    TextInput,
		 TouchableOpacity,
		  Image } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import States from "../States.json"
import Localities from "../Localities.json"

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


export default function RegisterFirstStepsAdopting({ navigation }) {

	const [userInput, setUserInput] = useState({ 
		telefono: "",
		pais: "", 
		provincia: "", 
		departamento: "" ,
	})
	
	return (
		<ScrollView>
			<Image
				className="absolute top-[16px] right-[22] z-[1]"
				source={require("../../../images/logo-black.png")}
			/>
			<View className="h-screen items-center justify-center bg-[#FFC733]">
				<Text className="absolute top-[121px] w-auto mx-auto font-roboto font-light text-[90px] leading-auto flex items-center text-center">
					¡Ya casi!
				</Text>
				<Text className="absolute top-[242px] w-[430px] mx-auto px-8 font-roboto font-[0] text-[38px] leading-auto flex items-center text-center">				
					Solo unos datos más y podrás adoptar:
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
							search={false}
							boxStyles={{backgroundColor:"#1E1E1E"}}
							inputStyles={{color:"#7E7E7E", fontSize: 18}}
							dropdownStyles={{backgroundColor:"#2E2E2E"}}
							dropdownTextStyles={{color:"#6E6E6E", fontSize: 18}}							
						/>
				</View>

			</View>
			<TouchableOpacity
				onPress={() => navigation.navigate("RegisterLastStepsAdopting", userInput)}
			>
				<Text className="absolute bottom-[50px] right-[28px] text-[36px]">
					Continue
				</Text>
			</TouchableOpacity>

		</ScrollView>
	)
}
