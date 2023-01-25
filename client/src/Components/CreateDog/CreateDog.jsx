import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, //botton
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import {firebase} from '../../firebase/config'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { PetPost} from "../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./validate";
  export const CreateDog = ({ navigation }) => {
    const dispatch = useDispatch();

    const data = [
      {key:'1', value:'Perro'},
      {key:'2', value:'Gato'},
      {key:'3', value:'Otro'},
  ]

  const [selected, setSelected]= useState()

  const [crear, setCrear] = useState({
    name: "",
    description: "",
    age: "",
    size: "",
    profilePic: ""
  })


  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage()
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`Pictures/${Date.now()}-${crear.name}`)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setCrear({...crear, profilePic:url})
          blob.close()
          return url
        })
      }
      )
  
    }
  const HandleSubmit = async (crear) => {
    dispatch(PetPost(crear))
    setCrear({    name: "",
    description: "",
    age: "",
    size: "",
    profilePic: ""})
    alert("se creo")
  };


    

  return (

    <>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../images/flecha.png')} style={{ width: 20, height: 20, marginRight: 30, marginTop: 60 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginTop: 50 }}>Añadir mascota:</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={{ fontSize: 30, marginRight: 10 }}>Nombre:</Text>
       
        <TextInput style={styles.input}
          placeholder="Nombre de tu mascota"
          placeholderTextColor="#fcfcfc"
          autoCapitalize="none"
          onChangeText={(text) => setCrear(validate({ ...crear, name: text }))}
        /> 

        <Text style={{ fontSize: 30, marginRight: 10 }}>Descripcion:</Text>
        <TextInput style={styles.input}
          placeholder="Como es?"
          placeholderTextColor="#fcfcfc"
          autoCapitalize="none"
          onChangeText={(text) => setCrear({ ...crear, description: text })}
        />

        <Text style={{ fontSize: 30, marginRight: 10 }}>Fecha de nacimiento:</Text>
        <TextInput style={styles.input}
          placeholder="Cuando nacio?"
          placeholderTextColor="#fcfcfc"
          autoCapitalize="none"
          onChangeText={(text) => setCrear({ ...crear, birthday: text })}

        />

        <Text style={{ fontSize: 30, marginRight: 10 }}>Tamaño:</Text>
        <Text style={{ fontSize: 30, marginRight: 10 }}></Text>

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
        <Text style={{ fontSize: 30, marginRight: 10 }}>Especie:</Text>
        <SelectList 
        
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
        <Text style={{ fontSize: 30, marginRight: 10 }}>Foto:</Text>
        <Text style={{ fontSize: 10, marginRight: 10 }}></Text>

        <TouchableOpacity onPress={() => pickImage()}>
 {!crear.profilePic ? <Image
              source={require('../../images/camera.png')}

              style={styles.imagen}
            /> :
            <Image source={{uri: image}} style={{width: 250 , height: 200, marginLeft: 70}}/>}
          {/* <Image source={{uri: foto}} style={styles.foto} /> */}
           
        </TouchableOpacity>


        <Text style={{ fontSize: 30, marginRight: 10 }}></Text>

        <TouchableOpacity onPress={HandleSubmit}>
          <Image
            source={require('../../images/buttoncrear.png')}
            style={styles.imagen2}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 30, marginRight: 10 }}></Text>

      </ScrollView>
      <View style={styles.container}>
     
    </View>
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
  submitButtonText: {
    color: 'white'
  }
})