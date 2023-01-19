import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient"


const { width, height } = Dimensions.get("screen")

export default function UserDetail({route, navigation}){
  
  const user = { 
    id: 1, 
    firstName: "Messi", 
    lastName: "Chiquito",
    age: 35, 
    rating: 5 , 
    profilePic: 'https://pbs.twimg.com/media/FdSKUwgWIAEJNX0.jpg', 
    description: "Soy Lionel Andrés Messi Cuccittini, nací en Rosario, el 24 de junio de 1987, soy conocido como Leo Messi, soy un futbolista argentino que juega como delantero o centrocampista. Jugador histórico del Fútbol Club Barcelona, al que estuve ligado veinte años, y desde 2021 integro el plantel del Paris Saint-Germain de la Ligue 1 de Francia.",
    address: "Torre Eiffel"
  }

  return(
    
    <View style={{height, backgroundColor: '#ACACAC'}}>
      <ImageBackground 
        style={{ width: '100%', height: 350, backgroundImage: 'linear-gradient'}}
        source={{uri: user.profilePic}}
        blurRadius={10}
      >
        <LinearGradient colors={['#00000000', '#ACACAC']} style={{height : '100%', width : '100%'}}>
          <View>
              <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                <Image 
                className="absolute top-10 left-5 w-10 h-10"
                source={require("../../images/FindAHome.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image 
                  className="absolute top-10 right-5 w-10 h-10"
                  source={require("../../images/Trust.png")}
                />
              </TouchableOpacity>
              <Image 
              className="absolute w-56 h-56 top-14 inset-x-1/4 rounded-full"
              source={{uri: user.profilePic}}
              />
              <Text className="text-center top-80 text-4xl" style={{color: "#f5c936"}}>{user.firstName} {user.lastName}</Text>
              <Text className="absolute top-96 left-5 text-center text-xl">Edad: {user.age} años</Text>
              <Text className="absolute top-96 right-5 text-center text-xl">Rating: {user.rating} ⭐</Text>
          </View>
        </LinearGradient> 
      </ImageBackground>
      <Text className="absolute bottom-32 text-xl text-center m-10">{user.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
})