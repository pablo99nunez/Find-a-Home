import React from 'react'
import { View, TouchableOpacity, Image, Text, ImageBackground } from 'react-native'

export const HeaderDetail = (props) => {
  const {onPress, days} = props
  return (
    <View  className='flex flex-row justify-between mt-11'>
        <TouchableOpacity onPress={onPress}>
                <Image 
                className = 'ml-3 w-12 h-12'
                source={require("../../images/icon1-icon3-welcome.png")}
                />
              </TouchableOpacity>
              <ImageBackground source={require('../../images/Banderin.png')} className = 'w-36 h-11' >
                <Text style={{fontWeight: 'bold', textAlign:'right', marginRight: 15, marginTop: 5 }}>{days} dias</Text>
                <Text style={{textAlign:'right', marginRight: 12}}>buscando hogar</Text>
              </ImageBackground>
    </View>
  )
}

