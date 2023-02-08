import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const Header = ({ onPress, handleButtons }) => {
    return (
        <View className="flex flex-row justify-between mx-[4%] w-auto pt-[10%]">
            <TouchableOpacity onPress={onPress}>
                <Image
                    className="w-12 h-11"
                    source={require("../../images/FindAHome.png")}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleButtons()}>
                <Icon name="dots-horizontal" className="w-12 h-12 drop-shadow-lg" size={50} color={"#100c00"} />
            </TouchableOpacity>
        </View>
    )
}

export default Header