import React from 'react'
import { Text, View } from 'react-native'
import { Size } from './Size'

export const Characteristics = (props) => {
  const {age, size} = props
  return (
    <View className= 'flex flex-row justify-around items-end'>
      <Size size={size}/>
      <Text className='text-2xl' >{age}</Text>
    </View>
  )
}
