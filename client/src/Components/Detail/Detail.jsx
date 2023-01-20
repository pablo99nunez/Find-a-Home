import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient"
import { FlatList } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { calculateAdoptionDays } from "../Funciones/DiasAdopcion";
import { HeaderDetail } from "./HeaderDetail";



export default function Detail({route, navigation}){
  
  const {profilePic, name , createdAt, gallery, description}= route.params

  const days = calculateAdoptionDays(createdAt)
  
  return(
    

    <View className='bg-[#acacac] h-full'>
      <ImageBackground style={styles.profilePic} source={{uri: profilePic}}>
        <LinearGradient colors={['#00000000', '#acacac']} style={{height : '100%', width : '100%'}}>
          <View>

            <View >
                <HeaderDetail onPress={()=> navigation.goBack()} days={days}/>
            </View>

            <View className='h-40'>
                <Text className='text-[#f5c936] text-4xl text-center my-6'>{name.toUpperCase()}</Text>
            </View>

            <View>
              {gallery? <FlatList horizontal={true} keyExtractor={(name) => name} data={gallery}
              renderItem={({item}) => (
                <Image style={styles.gallery} source={{uri: item}}/>
              )}></FlatList> : null}
            </View>  


          </View>
        </LinearGradient> 
      </ImageBackground>

      <Text className='text-2xl text-center'>{description}</Text>

      <ButtonYellow text='Adoptar' onPress={()=> alert('Adoptar')}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  profilePic:{ 
    width: '100%', 
    height: 350
  },
  gallery:{ 
    width: 90, 
    height: 90 , 
    marginLeft: 25
  }
})

