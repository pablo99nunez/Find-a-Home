import React from "react";
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity, //botton
  Button,
  ScrollView,
  Alert
} from "react-native";
import { ButtonYellow } from "../Buttons/Buttons";
import { useState } from "react";
  import {
    SafeAreaView,
    Platform,
    PermissionsAndroid,
  } from 'react-native';
import perro from "./running-dog-silhouette.png"
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref } from "firebase/storage";
import fire from "../../firebase/config";
export const CreateDog = ({navigation}) =>{





    const [crear, setCrear] = useState({
      name: "",
      description: "",
      age: "",
        size: "",
        profilePic: ""
    })
    const [imagen, setImagen] = useState("")


    let Udpload = async () => {

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      let json = JSON.stringify(result)
      uploadImage(result.assets[0].uri)
      .then((resolve => {
       let ref = fire.store().ref().child("images/" + crear.name )
        ref.put(resolve)
      }))
      setImagen(result.assets[0].uri);
      if (!result.canceled) console.log("se cancelo")
      
    }

   const  uploadImage = (uri) => {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response);
          }
        };
     
        xhr.open("GET", uri);
        xhr.responseType = "blob";
        xhr.send();
      });
     };
      
    

    const HandleSubmit = async () => {
      const IPv4 = "192.168.68.54";
      let info = JSON.stringify(crear);
      let url = `http://${IPv4}:8080/pet`;
      try {
        await axios({
          method: 'post',
          url: url,
          headers: { 'Content-Type': 'application/json' }, 
          data: crear
        });
        setCrear({
          name: "",
          description: "",
          age: "",
          size: "",
          profilePic: ""
        });
        alert("Creo que se creo");
      } catch (error) {
        console.error(error);
      }
    };

    return(

        <>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={require('../../images/flecha.png')} style={{width: 20, height: 20, marginRight: 30, marginTop: 60}} />
    </TouchableOpacity>
    <Text style={{ fontSize: 30, marginTop: 50}}>Añadir mascota:</Text>
</View>
        <ScrollView style={styles.container}>
                <Text style={{ fontSize: 30, marginRight: 10}}>Nombre:</Text>
            <TextInput style={styles.input}
                placeholder="Nombre de tu mascota"
                placeholderTextColor="#fcfcfc"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, name: text })} 
                />
                <Text style={{ fontSize: 30, marginRight: 10}}>Descripcion:</Text>
            <TextInput style={styles.input}
                placeholder="Como es?"
                placeholderTextColor="#fcfcfc"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, description: text })} 
 />

<Text style={{ fontSize: 30, marginRight: 10}}>Fecha de nacimiento:</Text>
            <TextInput style={styles.input}
                placeholder="Cuando nacio?"
                placeholderTextColor="#fcfcfc"
                autoCapitalize="none"
                     onChangeText={(text) => setCrear({ ...crear, age: text })} 

                />

<Text style={{ fontSize: 30, marginRight: 10}}>Tamaño:</Text>
<Text style={{ fontSize: 30, marginRight: 10}}></Text>

                <TouchableOpacity onPress={() => setCrear({ ...crear, size: "small" })}>
                    {crear.size === "small" ?
                        <Image

                            source={require('../../images/perro_rosa.png')}

                            style={styles.perrochico} /> : <Image

                            source={require('../../images/perro_negro.png')}

                            style={styles.perrochico} />}

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCrear({ ...crear, size: "medium" })}>
                    {crear.size === "medium" ?
                        <Image
                            source={require('../../images/perro_rosa.png')}
                            style={styles.mediano} />
                        :
                        <Image
                            source={require('../../images/perro_negro.png')}
                            style={styles.mediano} />}
                </TouchableOpacity>



                <TouchableOpacity onPress={() => setCrear({ ...crear, size: "large" })}>
                    {crear.size === "large" ?
                        <Image
                            source={require('../../images/perro_rosa.png')}
                            style={styles.grande} />
                        :
                        <Image
                            source={require('../../images/perro_negro.png')}
                            style={styles.grande} />}
                </TouchableOpacity>

                <Text style={{ fontSize: 30, marginRight: 10}}>Foto:</Text>
                <Text style={{ fontSize: 10, marginRight: 10}}></Text>

                <TouchableOpacity onPress={() =>Udpload()}>
  
  {/* <Image source={{uri: foto}} style={styles.foto} /> */}
  {crear.profilePic.length ?   <Image
                            source={crear.profilePic}

                            style={styles.imagen}
                            /> :
                <Image
                            source={require('../../images/camera.png')}

                            style={styles.imagen}
                            />}

                </TouchableOpacity>
                <Text style={{ fontSize: 30, marginRight: 10}}></Text>

                <TouchableOpacity onPress={HandleSubmit}>
                <Image
                            source={require('../../images/buttoncrear.png')}
                            style={styles.imagen2}
                            />
                             </TouchableOpacity>

                                <Text style={{ fontSize: 30, marginRight: 10}}></Text>

        </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23,
      },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
      },
      textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
      },
      imagen: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40
      },
      imagen2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
    
      },
      buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
      },
      imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
      },
    container2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
      },
    perrochico: {
        width: 60,
        height: 60,
        marginLeft: 10
      },
      mediano: {
        width: 80,
        height: 80,
        marginLeft: 120,
        marginTop: -70


      },
      grande: {
        width: 100,
        height: 100,
        marginLeft: 250,
        marginTop: -90

      },
    input: {
       margin: 15,
       height: 40,
       borderWidth: 1,
       backgroundColor: '#656568',
       borderRadius: 5

    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
 })