import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const { width, height } = Dimensions.get("screen");

const Card = ({item}) => {
    return (
        <View style={styles.container}>
            <Image
                className="relative"
                style={styles.imagen}
                source={{uri: item.profilePic}}
            />
            <LinearGradient
                    className="absolute"
                    colors={["#00000000","rgba(0, 0, 0, 0.4)", "#000000"]}
                    style={styles.gradient}
            >
            </LinearGradient>
            <Text className="absolute bottom-1 text-start ml-2 mb-2" style={styles.dogName}>{item.name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
container: {
    width: width * 0.4,
    height: width * 0.4,
    margin: 15
},
dogName: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Roboto_300Light'
},
imagen: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 20,
    
},
gradient:{
    width: width * 0.4,
    height: width * 0.4 * 0.4375, // 42% of card height
    bottom: 0,
    borderRadius: 20,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
}
})
export default Card;

