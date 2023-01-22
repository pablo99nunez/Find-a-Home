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
} from "react-native";
import { ButtonYellow } from "../Buttons/Buttons";
import { useState } from "react";
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';
  import {
    SafeAreaView,
    Platform,
    PermissionsAndroid,
  } from 'react-native';
import perro from "./running-dog-silhouette.png"



export const CreateDog = () =>{



    const [filePath, setFilePath] = useState({});

    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else return true;
    };
  
    const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else return true;
    };
  
    const captureImage = async (type) => {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
          console.log('Response = ', response);
  
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response);
        });
      }
    };
  
    const chooseFile = (type) => {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    };
    const [crear, setCrear] = useState({
        nombre: "",
        descripcion: "",
        fecha_de_nacimiento: "",
        tamaño: "",
        foto: ""
    })

    return(
        <><View style={styles.container}>
            <Text style={{ fontWeight: 'bold' }}> Nombre</Text>
            <TextInput style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, nombre: text })} />
            <Text style={{ fontWeight: 'bold', }}> Descripcion</Text>
            <TextInput style={styles.input}
                placeholder="Ingresa la descripcion del animal"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, descripcion: text })} />

            <Text style={{ fontWeight: 'bold', }}> Fecha de nacimiento</Text>
            <TextInput style={styles.input}
                placeholder="Ingresa la fecha aproximada de nacimiento"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(text) => setCrear({ ...crear, fecha_de_nacimiento: text })} />

            <Text style={{ fontWeight: 'bold', }}> Tamaño</Text>

            <View style={styles.container2}>
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

            </View>
            {/* <ButtonYellow
    text= "asd"
    onPress={()=> alert("apretastes el boton")}
    />
     */}
        </View><SafeAreaView style={{ flex: 1 }}>
                <Text style={styles.titleText}>
                    Example of Image Picker in React Native
                </Text>
                <View style={styles.container}>
                    {/* <Image
      source={{
        uri: 'data:image/jpeg;base64,' + filePath.data,
      }}
      style={styles.imageStyle}
    /> */}
                    <Image
                        source={{ uri: filePath.uri }}
                        style={styles.imageStyle} />
                    <Text style={styles.textStyle}>{filePath.uri}</Text>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => captureImage('photo')}>
                        <Text style={styles.textStyle}>
                            Launch Camera for Image
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => captureImage('video')}>
                        <Text style={styles.textStyle}>
                            Launch Camera for Video
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('photo')}>
                        <Text style={styles.textStyle}>Choose Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('video')}>
                        <Text style={styles.textStyle}>Choose Video</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView></>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
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
        width: 50,
        height: 50,
        marginLeft: -150
      },
      mediano: {
        width: 80,
        height: 80,
        marginTop: -15

      },
      grande: {
        width: 100,
        height: 100,
        marginLeft: 250,
        marginTop: -20

      },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
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