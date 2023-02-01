import React, { useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image
} from "react-native";
import { createAccountWithEmailAndPassword } from '../../../firebase/authentication'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { putUserData } from "../../../Redux/Actions";
//Again, Why?? 


const RegisterLastSteps = ({ route, navigation }) => {

	const {
		email,
		password,
		firstName,
		lastName,
		telefono,
		pais,
		departamento,
		provincia
	} = route.params

	const [userNewInput, setuserNewInput] = useState({
		email,
		password,
		firstName,
		lastName,
		telefono,
		pais,
		departamento,
		provincia,
		condiciones: {},
	})

	const [checkState, setCheckState] = useState({})

	const [accepted, setAccepted] = useState(false);

	const [loading, setLoading] = useState(false);

	const HandleCheck = (option) => {
		setCheckState({ ...checkState, [option]: !checkState[option] })
		setuserNewInput({ ...userNewInput, condiciones: { ...userNewInput.condiciones, [option]: !checkState[option] } })
	}
	const handleContinuar = () => {
		setLoading(true)
		createAccountWithEmailAndPassword(email, password, firstName,
			lastName,
			telefono,
			userNewInput.condiciones,
			pais,
			departamento,
			provincia)
			.then(resp => {
				navigation.navigate("Home")
			})
			.catch(err => console.error("⚠️ Error -> 🚨 Register - Entering -> 🔔Register Last Steps: " + err.message))
			.finally(e => {
				setLoading(false)
			})

	}

	return (
		<ScrollView>
			<View className="h-screen items-center bg-[#FFC733] w-screen">
				<Text className="w-auto mx-auto font-light text-4xl leading-auto items-center text-center mb-5">
					¡Bienvenida Florencia!
				</Text>
				<Text className="w-11/12 mx-auto px-8 mb-5 text-xl leading-auto flex items-center text-center">
					Que condiciones puedes ofrecer a tus mascotas?
				</Text>

				<TouchableOpacity onPress={() => HandleCheck("Techo")} className={checkState.Techo ? "mt-3 self-start mx-14 rounded-full bg-[#AB4E68] p-2" : 'mt-3 self-start mx-14 rounded-full bg-[#d9d9d971] p-2'}>
					<Text className={checkState.Techo ?
						"text-center text-[#FFF] text-2xl font-extralight"
						: "text-center text-[#000000] text-2xl font-extralight"}>
						Techo
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => HandleCheck("AlimentoBalanceado")} className={checkState.AlimentoBalanceado ? "mt-3 self-start mx-14 rounded-full bg-[#AB4E68] p-2" : 'mt-3 self-start mx-14 rounded-full bg-[#d9d9d971] p-2'}>
					<Text className={checkState.AlimentoBalanceado ?
						"text-center text-[#FFF] text-2xl font-extralight"
						: "text-center text-[#000000] text-2xl font-extralight"}>
						Alimento Balanceado
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => HandleCheck("PaseosDiarios")} className={checkState.PaseosDiarios ? "mt-3 self-start mx-14 rounded-full bg-[#AB4E68] p-2" : 'mt-3 self-start mx-14 rounded-full bg-[#d9d9d971] p-2'}>
					<Text className={checkState.PaseosDiarios ?
						"text-center text-[#FFF] text-2xl font-extralight"
						: "text-center text-[#000000] text-2xl font-extralight"}>
						Paseos Diarios
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => HandleCheck("Vacunas")} className={checkState.Vacunas ? "m-3 self-start mx-14 rounded-full bg-[#AB4E68] p-2" : 'm-3 self-start mx-14 rounded-full bg-[#d9d9d971] p-2'}>
					<Text className={checkState.Vacunas ?
						"text-center text-[#FFF] text-2xl font-extralight"
						: "text-center text-[#000000] text-2xl font-extralight"}>
						Vacunas
					</Text>
				</TouchableOpacity>


				<View className="flex flex-row justify-center items-center">
					<View className="w-7 h-7">
						<TouchableOpacity onPress={() => setAccepted(!accepted)}>
							<Text className={accepted ?
								"bg-[#AB4E68] text-[#FFF] border-2 border-[#AB4E68] text-center text-md rounded-[5px] m-0.5 overflow-visible"
								: "bg-[#d9d9d971] text-[#0000004e] border-2 border-[#AB4E68] text-center text-md rounded-[5px] m-0.5 "}>
								{accepted && "✔"}
							</Text>
						</TouchableOpacity>
					</View>

					<View className="flex flex-row  ">
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

		</ScrollView>
	)
}

export default RegisterLastSteps;