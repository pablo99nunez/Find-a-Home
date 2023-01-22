import React from "react";
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
  ScrollView
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


export const CreateDog = () =>{



  let permissionGranted = false;

  const requestGalleryPermission = async () => {
    return new Promise((resolve) => {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permiso para acceder a la galería',
            message: 'Necesitamos acceder a tu galería para seleccionar imágenes.',
            buttonNeutral: 'Preguntarme luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          },
        ).then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Galería permitida');
          } else {
            console.log('Galería no permitida');
          }
          resolve(granted);
        });
      } catch (err) {
        console.warn(err);
      }
    });
  };
  
  const openCamera = async () => {
    await requestGalleryPermission();
      launchImageLibrary({}, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setFoto(response.uri);
        }
      });
    
  }



    const [crear, setCrear] = useState({
        nombre: "",
        descripcion: "",
        fecha_de_nacimiento: "",
        tamaño: "",
        foto: ""
    })

    return(

        <>
<View style={{flexDirection: 'row'}}>
    <Image source={require('../../images/flecha.png')} style={{width: 20, height: 20, marginRight: 30, marginTop: 60}} />
    <Text style={{ fontSize: 30, marginTop: 50}}>Añadir mascota:</Text>
</View>
        <ScrollView style={styles.container}>
                <Text style={{ fontSize: 30, marginRight: 10}}>Nombre:</Text>
            <TextInput style={styles.input}
                placeholder="Nombre de tu mascota"
                placeholderTextColor="#fcfcfc"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, nombre: text })} />
                <Text style={{ fontSize: 30, marginRight: 10}}>Descripcion:</Text>
            <TextInput style={styles.input}
                placeholder="Como es?"
                placeholderTextColor="#fcfcfc"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, descripcion: text })} />

<Text style={{ fontSize: 30, marginRight: 10}}>Fecha de nacimiento:</Text>
            <TextInput style={styles.input}
                placeholder="Cuando nacio?"
                placeholderTextColor="#fcfcfc"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, fecha_de_nacimiento: text })} />

<Text style={{ fontSize: 30, marginRight: 10}}>Tamaño:</Text>
<Text style={{ fontSize: 30, marginRight: 10}}></Text>

                <TouchableOpacity onPress={() => setCrear({ ...crear, tamaño: "pequeño" })}>
                    {crear.tamaño === "pequeño" ?
                        <Image

                            source={require('../../images/perro_rosa.png')}

                            style={styles.perrochico} /> : <Image

                            source={require('../../images/perro_negro.png')}

                            style={styles.perrochico} />}

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCrear({ ...crear, tamaño: "mediano" })}>
                    {crear.tamaño === "mediano" ?
                        <Image
                            source={require('../../images/perro_rosa.png')}
                            style={styles.mediano} />
                        :
                        <Image
                            source={require('../../images/perro_negro.png')}
                            style={styles.mediano} />}
                </TouchableOpacity>



                <TouchableOpacity onPress={() => setCrear({ ...crear, tamaño: "grande" })}>
                    {crear.tamaño === "grande" ?
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

                <TouchableOpacity onPress={() =>openCamera()}>
  
  {/* <Image source={{uri: foto}} style={styles.foto} /> */}
                <Image
                            source={require('../../images/camera.png')}
                            style={styles.imagen}
                            />
                </TouchableOpacity>
                <Text style={{ fontSize: 30, marginRight: 10}}></Text>

                <ButtonYellow
              
                />
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