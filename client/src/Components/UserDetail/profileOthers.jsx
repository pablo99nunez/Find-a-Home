import React, { useState } from 'react'
import { View, ImageBackground, Text, Image, ScrollView, TouchableOpacity} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import Card from '../Card/Card';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL_IP } from "@env"
import { auth } from '../../firebase/authentication';
import { FlatList } from 'react-native-gesture-handler';

export const ProfileOthers = ({route, navigation}) => {
 const { email, profilePic, firstName, lastName} = route.params
 const token = auth.currentUser?.stsTokenManager.accessToken;
const [userProfile, setUserProfile] = useState({})
 
useFocusEffect(
  React.useCallback(() => {
    async function evitaReturnDelUseEffect() {
      try {
        await axios.get(`${BASE_URL_IP}/user?email=${email}`,{
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => setUserProfile({...response.data[0]}))
       

      } catch (error) {
        console.error("⚠️ Error -> 🚨 profileOthers -> 🔔 gettingUser: " + error.message)
      }
    }
    evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
  }, [])
)


  return (
    <View className='bg-[#ACACAC] h-[100%]'>
        <ImageBackground
        style={{
          width: "100%",
          height: 400,
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
           
            <Image
              className="w-64 h-64 mx-auto rounded-full my-10"
              source={{ uri: profilePic }}
            />
          </View>
      <View className="flex flex-row justify-between w-11/12 mx-auto">
       
          <Text className="font-light text-4xl">{firstName} {lastName}</Text>
        <Text className=" text-4xl text-[#ffc733]">{userProfile.rating?.rating? userProfile.rating.rating : null}★</Text>
      </View>
        </LinearGradient>
      </ImageBackground>
      
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
            {userProfile.conditions?.vacunas?   
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

    </View>
  )
}
