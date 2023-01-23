import React from 'react'
import {
     View,
      TouchableOpacity,
       Image } from 'react-native'


const Header = ({onPress, navigation}) => {
  return (
    <View className="flex flex-row justify-between mx-[4%] w-auto mt-[6%]">
        <TouchableOpacity onPress={onPress}>
            <Image
                className="w-16 h-16"
                source={require("../../images/FindAHome.png")}
            />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigation}>
            <Image
                className="w-16 h-16"
                source={require("../../images/Trust.png")}
            />
        </TouchableOpacity>
    </View>
  )
}

export default Header