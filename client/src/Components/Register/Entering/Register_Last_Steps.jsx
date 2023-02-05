import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image
} from "react-native";

import { crearYrellenarDB } from '../../../firebase/authentication'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { putUserData } from "../../../Redux/Actions";
import { registerForPushNotificationsAsync as setPushToken } from "../../../firebase/pushNotifications";
import Condition from "./Condition";

const RegisterLastSteps = ({ route, navigation }) => {

	const {
		email,
		password,
		firstName,
		lastName,
		phone,
		pais,
		departamento,
		provincia
	} = route.params

	const [userNewInput, setuserNewInput] = useState({
		email,
		password,
		firstName,
		lastName,
		phone,
		pais,
		departamento,
		provincia,
		condiciones: {},
		pushToken: [],
	})


	useFocusEffect(
		React.useCallback(() => {
			async function getPushToken() {
				try {
					const pushToken = await setPushToken();

					setuserNewInput({ ...userNewInput, pushToken: [pushToken] })
				} catch (error) {
					console.log(error.message)
				}
			}
			getPushToken()
		}, [])
	);




	const [checkState, setCheckState] = useState({})

	const [accepted, setAccepted] = useState(false);

	const [loading, setLoading] = useState(false);

	const HandleCheck = (option) => {
		console.log(userNewInput)
		setCheckState({ ...checkState, [option]: !checkState[option] })
		setuserNewInput({ ...userNewInput, condiciones: { ...userNewInput.condiciones, [option]: !checkState[option] } })
	}
	const handleContinuar = () => {
		setLoading(true)
		crearYrellenarDB({
			email,
			password,
			firstName,
			lastName,
			phone,
			conditions:userNewInput.condiciones,
			pushToken:userNewInput.pushToken,
			address:`${pais},${departamento},${provincia}`,
			})
			.then(resp => {
				navigation.navigate("Home")
			})
			.catch(err => {
				if (typeof err.response !== "undefined" && err.response.data.error)
				console.error(err.response.data.error)	  
				setLoading(false)
				console.error(err.message)
			})

	}

	return (
		<View>
			<View className="h-screen items-center bg-[#FFC733] w-screen">
				<Text className="w-auto mx-auto font-light text-4xl leading-auto items-center text-center mb-5">
				¡Bienvenido/a {firstName[0].toUpperCase().concat(firstName.toLowerCase().substring(1))}
				</Text>
				<Text className="w-11/12 mx-auto px-8 mb-5 text-xl leading-auto flex items-center text-center">
					Que condiciones puedes ofrecer a tus mascotas?
				</Text>
				<View className="flex flex-row flex-wrap items-center justify-center mx-auto">
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Techo"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Alimento Balanceado"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Paseos Diarios"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Vacunas"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Castración"} />
				</View>


				<View className="flex flex-row justify-center items-center mt-[10%]">
					<View className="w-7 h-7">
						<TouchableOpacity onPress={() => setAccepted(!accepted)}>
							<Text className={accepted ?
								"bg-[#AB4E68] text-[#FFF] border-2 border-[#AB4E68] text-center text-md rounded-[5px] m-0.5 overflow-visible"
								: "bg-[#d9d9d971] text-[#0000004e] border-2 border-[#AB4E68] text-center text-md rounded-[5px] m-0.5 "}>
								{accepted && "✔"}
							</Text>
						</TouchableOpacity>
					</View>

					<View className="flex flex-row ">
						<Text>
							Acepto
						</Text>
						<TouchableOpacity onPress={() => console.log('terms link here')}>
							<Text className="text-[#AB4E68]"> Terminos y condiciones</Text>
						</TouchableOpacity>
					</View>
				</View>
				{accepted ? null : <Text className="text-[12px]">
					Debe aceptar los términos y Condiciones para continuar.
				</Text>}


				{accepted ?
					loading ?
						<Text className="text-3xl font-light">
							Cargando...
						</Text>
						: <TouchableOpacity className='absolute bottom-28 flex flex-row justify-end w-11/12 mb-5'
							onPress={() => {
								handleContinuar()
							}}
						>
							<Text className="text-3xl font-light">
								Continuar
							</Text>
						</TouchableOpacity>

					:
					null
				}
			</View>

		</View>
	)
}

export default RegisterLastSteps;
