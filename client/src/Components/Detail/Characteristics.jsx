import React from 'react'
import { Text, View } from 'react-native'

export const Characteristics = (props) => {
  const {age, size} = props
  return (
    <View className= 'flex flex-row justify-around'>
      <Text>{size}</Text>
      <Text className='text-xl' >{age}</Text>
    </View>
  )
}
