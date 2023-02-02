import React from 'react'
import { View } from 'react-native'

export const profileOthers = (props) => {
  return (
    <View>
        <ImageBackground
        style={{
          width: "100%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}
        source={{ uri: profilePic }}
        blurRadius={10}
      >
        <LinearGradient
          colors={["#00000000", "#ACACAC"]}
          style={{ height: "100%", width: "100%" }}
        >
          <View>
            <Header
              onPress={() => navigation.navigate("Home")}
              navigation={() => navigation.navigate("CreatePet")}
            />
            <Image
              className="w-64 h-64 bottom-6 mx-auto rounded-full"
              source={{ uri: profilePic }}
            />
          </View>
        </LinearGradient>
      <View className="flex flex-row justify-between w-11/12 mx-auto">
        <Text className=" text-4xl">{firstName} {lastName}</Text>
        <Text className=" text-4xl text-[#ffc733]">{rating?.rating? rating.rating : null}★</Text>
      </View>
      </ImageBackground>
    </View>
  )
}
