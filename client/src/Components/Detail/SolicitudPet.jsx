import React from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
const SolicitudPet = (item) => {
	return (
		<ScrollView>
			<Text>Solicitud de Adopción</Text>
			<Image className="h10 w-10" source={{ uri: currentUser.profilePic }} />
		</ScrollView>
	)
}

export default SolicitudPet