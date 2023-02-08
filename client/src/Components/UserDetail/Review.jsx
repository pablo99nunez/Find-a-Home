import React from 'react';
import { View, Text } from 'react-native';

const Review = ({ item }) => {
    return (
        <View className="flex flex-col m-[2%] bg-[#FFC733] p-[3%] rounded-xl">
            <Text style={{ fontFamily: "Roboto_300Light" }} className="text-center text-xl" >{item? item : "No se encontraron reseñas"}</Text>
        </View>
    )
};

export default Review;