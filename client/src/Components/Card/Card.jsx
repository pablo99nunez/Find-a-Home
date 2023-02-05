import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

const { width } = Dimensions.get("screen");

const Card = ({item}) => {
    return (
        <View style={styles.container}>
            <Image
                className='relative h-[100%] w-[100%] rounded-3xl'
                source={{uri: item.profilePic}}
            />
            <ImageBackground source={require('../../images/Banderin-r.png')} className='absolute top-[10%] w-[85%]'>
                <Text className='left-[10%] text-start text-xm' style={{fontFamily: 'Roboto_300Light'}}>{
                    item.state === "Lost" ? "Perdido" : 
                    item.state === 'Adopted'? "Adoptado":
                    item.state === 'Found'? "Encontrado":
                    item.state === "NotAdoptable"? "No adoptable":
                    item.state === 'InAdoptionProcess'? "En proceso de adopción":
                    "En adopción" 
                }</Text>
            </ImageBackground>
            <LinearGradient
                    className='absolute h-[100%] w-[100%] rounded-3xl'
                    colors={['#00000000','rgba(0, 0, 0, 0.05)', '#000000']}
            >
            </LinearGradient>
            <Text className='absolute bottom-[8%] left-[10%] text-start text-2xl text-white w-[85%]' style={{fontFamily: 'Roboto_300Light'}}>
                {item.name[0].toUpperCase().concat(item.name.toLowerCase().substring(1))}
            </Text>    
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width * 0.4,
        height: width * 0.4,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginBottom: width * 0.025,
        marginTop: width * 0.025
    },
})
export default Card;

