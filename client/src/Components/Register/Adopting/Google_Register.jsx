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
import GoogleImage from "../../../images/Google.svg"

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function GoogleRegister({ navigation }) {

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
					Debes registrarte para poder adoptar una mascota
				</Text>
				<TouchableOpacity 
					className="relative top-2"
					onPress={() => navigation.navigate("RegisterFirstStepsAdopting")}
					>
						<View>
							<GoogleImage width={104} height={104}/>
						</View>					
				</TouchableOpacity>
			</View>
		</ScrollView>
	)
}