import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from "react-native";

export default function Detail({route}){
  const {profilePic, name , age , rescued, createdAt}= route.params
  const dateOf = createdAt.slice(0,10)
  const today = new Date().toISOString().slice(0,10)
  const day1 = new Date(today); 
  const day2 = new Date(dateOf);
  const difference= Math.abs(day2-day1);
  const days = difference/(1000 * 3600 * 24)
  
  return(
    <View>
      <ImageBackground 
      style={{ width: '100%', height: 330}}
      source={{uri: profilePic}}
      >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Image 
            style={styles.logo}
            source={require("../../images/FindAHome.png")}
            />
            <Text style={styles.title}>{name.toUpperCase()}</Text>
            <View style={styles.banderin}>
              <Text style={{fontWeight: 'bold', textAlign:'right', marginRight: 10}}>{days} dias</Text>
              <Text style={{textAlign:'right', marginRight: 10}}>buscando hogar</Text>
            </View>
          </View>
        </View>


      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    justifyContent: 'space-between'
  },
  container:{
    flex:1,
    justifyContent: 'center'
  },
  title:{
    textAlign: 'center',
    fontSize: 40,
    color:'#f5c936',
  },
  logo:{ 
    width: 50,
    height: 50,
    position: 'absolute',
    top: 10 ,
    left: 10
  },
  banderin:{
    backgroundColor: '#f5c936',
    width: 130,
    heigth: 50,
    position: "absolute",
    top: 10,
    right: 0
  },
  


})

