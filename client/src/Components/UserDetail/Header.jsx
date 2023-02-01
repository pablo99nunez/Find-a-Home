import React from 'react'
import {
     View,
      TouchableOpacity,
       Image } from 'react-native'


const Header = ({onPress, navigation}) => {
  return (
    <View className="flex flex-row justify-between mx-[4%] w-auto pt-[10%]">
        <TouchableOpacity onPress={onPress}>
            <Image
                className="w-12 h-11"
                source={require("../../images/FindAHome.png")}
            />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigation}>
            <Image
                className="w-12 h-12"
                source={require("../../images/Trust-profile.png")}
            />
        </TouchableOpacity>
    </View>
  )
}

export default Header