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
<<<<<<< Updated upstream
      
      <View className='flex items-center mt-3 w-11/12 mx-auto'>
          <Text className="text-center text-2xl text-[#2A2B20] font-light">
            Las condiciones que le puedo brindar a mi mascota son:</Text>
            <View className='flex flex-row flex-wrap w-10/12'>
            {userProfile.conditions?.Techo?
              <View className='mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 '>
                <Text className= 'text-[#fff]'>
                  Techo
                </Text>
              </View> : null}
            {userProfile.conditions?.AlimentoBalanceado?
              <View className='mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 '>
                <Text className= 'text-[#fff]'>
                  Alimento Balanceado
                </Text>
              </View> : null}
            {userProfile.conditions?.PaseosDiarios?
              <View className='mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 '>
                <Text className= 'text-[#fff]'>
                  Paseos Diarios 
                </Text>
              </View> : null}
            {userProfile.conditions?.Vacunas?   
            <View className='mt-3 self-start mx-4 rounded-full bg-[#AB4E68] p-2 '>
              <Text className= 'text-[#fff]'> 
                Vacunas
              </Text>
            </View> : null}
            </View>
      </View>
      <View>
        <Text>{userProfile.description? userProfile.description : null}</Text>
      </View>

=======
>>>>>>> Stashed changes
    </View>
  )
}
