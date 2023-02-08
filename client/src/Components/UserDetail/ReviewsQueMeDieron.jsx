import React from 'react';
import { View, Text, ImageBackground, FlatList, Dimensions } from 'react-native';
import Review from './Review';

const {width, height} = Dimensions.get("screen")

const ReviewQueMeDieron = (props) => {
    const {reviews} = props.route.params
    return (
        <View className="bg-[#ACACAC]" style={{height: height}}>
        <ImageBackground
          source={require("../../images/Banderin-r.png")}
          className="w-[70%] my-[3%]"
        >
          <Text
            className="text-start text-2xl text-[#2A2B20] ml-[10%]"
            style={{ fontFamily: "Roboto_300Light" }}
          >
            Reseñas:
          </Text>
        </ImageBackground>
        <FlatList
          numColumns={1}
          keyExtractor={(item) => item.id}
          data={reviews}
          renderItem={({ item }) => (
              <Review item={item} />
            )}
        ></FlatList>
      </View>
    )
};

export default ReviewQueMeDieron;