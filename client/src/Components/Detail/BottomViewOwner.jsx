import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const { width } = Dimensions.get("screen");
export const BottomViewOwner = ({ solicitudes, navigation, petId, name }) => {
  

  return (
    <View>
      <BottomSheetView>
        <Text className='text-3xl mx-auto font-extralight'>Solicitudes</Text>
        {solicitudes.length < 1 ?
          <Text className='text-2xl mx-auto'>Aun no hay solicitudes para tu mascota!</Text>
          :
          <FlatList
            keyExtractor={(item) => item.email}
            data={solicitudes}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Solicitud de Adopcion", { item, petId, name })} className='flex flex-row items-center justify-evenly mt-3'>
                <Image
                  className='rounded-full '
                  style={styles.imagen}
                  source={{ uri: item.profilePic }} />
                <View className='w-3/6'>
                  <Text className='text-xl font-bold'>
                    {item.firstName[0].toUpperCase().concat(item.firstName.toLowerCase().substring(1))} {item.lastName[0].toUpperCase().concat(item.lastName.toLowerCase().substring(1))}
                    </Text>
                  <Text className='text-md'>
                    {item.message?.slice(0, 20).concat('...')}
                  </Text>
                </View>
                <Image
                  style={styles.imagen2}
                  source={require('../../images/threedots.png')}
                />
              </TouchableOpacity>
            )} />}
      </BottomSheetView>
    </View>
  )
}

const styles = StyleSheet.create({
  imagen: {
    width: width * 0.16,
    height: width * 0.16,
  },
  imagen2: {
    width: width * 0.1,
    height: width * 0.1
  }
})