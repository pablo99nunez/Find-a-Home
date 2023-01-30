import React from 'react'
import { ScrollView, Text, View, Image, Linking } from 'react-native'
import { ButtonYellow } from '../Buttons/Buttons';
import { acceptAdoption } from "../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
// import * as Linking from 'expo-linking'
const SolicitudPet = (item) => {
	const dispatch = useDispatch()
	const { email, profilePic, message, phone, firstName } = item.route.params.item;

	const petId = item.route.params.petId
	const handleContact = async () => {
		if (phone) {
			const url = `http://wa.me/54${phone}`
			const supported = await Linking.canOpenURL(url);
			if (supported) {
				await Linking.openURL(url);
			} else {
				alert(`Don't know how to open this URL: ${url}`);
			}
		} else {
			alert('ups el usuario no ha dejado su informacion de contacto')
		}
	};


	async function confirmAdoption() {

		const newOwnerEmail = email;
		dispatch(acceptAdoption(petId, newOwnerEmail));


	}


	return (
		<ScrollView className="flex">
			{/* <Text className="my-5 mx-auto text-3xl text-bold">Solicitud de Adopción</Text> */}
			<Image style={{ width: 100, height: 100 }} className="rounded-full mx-auto mt-6" source={{ uri: profilePic }} />
			<View>
				<Text className="my-5 mx-auto text-lg">{firstName}</Text>
				<Text className="my-5 mx-auto text-lg">{message}</Text>
			</View>
			<ButtonYellow text={"contacto"} onPress={() => handleContact()} />
			<ButtonYellow text={"Aceptar Solicitud"} onPress={() => confirmAdoption()} />
		</ScrollView>
	)
}

export default SolicitudPet