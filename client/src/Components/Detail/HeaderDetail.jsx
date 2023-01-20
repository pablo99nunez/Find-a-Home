import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'

export const HeaderDetail = (props) => {
  const {onPress, days} = props
  return (
    <View  className='flex flex-row justify-between my-7'>
        <TouchableOpacity onPress={onPress}>
                <Image 
                className = 'drop-shadow-2xl ml-3 w-12 h-12'
                source={require("../../images/FindAHome.png")}
                />
              </TouchableOpacity>
              <View  className = 'bg-[#f5c936] w-32 h-9' >
                <Text style={{fontWeight: 'bold', textAlign:'right', marginRight: 10}}>{days} dias</Text>
                <Text style={{textAlign:'right', marginRight: 10}}>buscando hogar</Text>
              </View>
    </View>
  )
}

