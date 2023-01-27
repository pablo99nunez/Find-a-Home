import { BottomSheetView } from '@gorhom/bottom-sheet';
import React from 'react'
import { View, TouchableOpacity, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const { width } = Dimensions.get("screen");
export const BottomViewOwner = ({ solicitudes, navigation }) => {
  return (
    <View>
      <BottomSheetView>
        <Text className='text-2xl mx-auto'>Solicitudes</Text>
        {solicitudes.length < 1 ?
          <Text className='text-2xl mx-auto'>Aun no hay solicitudes para tu mascota!</Text>
          :
          <FlatList
            keyExtractor={(item) => item.firstName}
            data={solicitudes}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("Solicitud de Adopcion", item)} className='flex flex-row items-center justify-evenly'>
                <Image
                  className='rounded-full '
                  style={styles.imagen}
                  source={{ uri: item.profilePic }} />
                <View>
                  <Text className='text-2xl font-bold'>{item.firstName}</Text>
                  <Text className='text-md'>
                    {item.message.slice(0,20).concat('...')}
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
    width: width * 0.17,
    height: width * 0.17,
  },
  imagen2: {
    width: width * 0.1,
    height: width * 0.1
  }
})