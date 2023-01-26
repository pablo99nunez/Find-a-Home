import React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { ButtonYellow } from '../Buttons/Buttons';

const SolicitudPet = (item) => {
	const { email, profilePic, message } = item.route.params;
	return (
		<ScrollView className="flex">
			<Text className="my-5 mx-auto text-3xl text-bold">Solicitud de Adopción</Text>
			<Image style={{ width: 100, height: 100 }} className="rounded-full mx-auto my-1" source={{ uri: profilePic }} />
			<View>
				<Text className="my-5 mx-auto text-lg">{message}</Text>
			</View>
			<ButtonYellow text={"contacto"} onPress={() => console.log(email)} />
			<ButtonYellow text={"Aceptar Solicitud"} onPress={() => alert("Solicitud Aceptada")} />
		</ScrollView>
	)
}

export default SolicitudPet