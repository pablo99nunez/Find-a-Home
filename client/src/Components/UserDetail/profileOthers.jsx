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
  const [pets, setPets] = useState([])
 
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
        await axios.get(`${BASE_URL_IP}/pet/byowner?email=${email}`,{
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => setPets([...response.data]))
        

      } catch (error) {
        console.error("⚠️ Error -> 🚨 profileOthers -> 🔔 gettingUser: " + error.message)
      }
    }
    evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
  }, [])
)


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

      <View>
      <FlatList
          className='my-auto'
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={pets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
              <Card style={{ width: 120, height: 120 }} item={item} />
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>

    </View>
  )
}
