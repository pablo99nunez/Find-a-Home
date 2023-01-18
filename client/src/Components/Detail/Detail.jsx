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
  const today = new Date()
  console.log(today)
  return(
    <View>
      <ImageBackground 
      style={{ width: '100%', height: 330}}
      source={{uri: profilePic}}
      >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <Image 
            style={{ width: 50, height: 50, position: 'absolute', top: 10 , left: 10}}
            source={require("../../images/FindAHome.png")}
            />
            <Text style={styles.title}>{name.toUpperCase()}</Text>
            <Text>{createdAt}</Text>
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
  }
})

