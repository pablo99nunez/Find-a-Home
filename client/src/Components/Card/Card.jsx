import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const Card = ({item}) => {
    return (
        <View className="flex justify-center items-center text-center">
            <Image
                style={styles.imagen}
                source={{uri: item.profilePic}}
            />
            <Text className="absolute bottom-1" style={styles.dogName}>{item.name}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
dogName: {
    marginTop: 24,
    padding: 15,
    fontSize: 25,
    color: 'white'
  },
  imagen: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 40,
    margin: 15
  }
})
export default Card;

