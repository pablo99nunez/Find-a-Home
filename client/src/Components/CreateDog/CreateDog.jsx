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
import perro from "./running-dog-silhouette.png"


export const CreateDog = () =>{

    const [crear, setCrear] = useState({
        nombre: "",
        descripcion: "",
        fecha_de_nacimiento: "",
        tamaño: "",
        foto: ""
    })

    return(
        <View style = {styles.container}>
        <Text style={{fontWeight: 'bold'}}> Nombre</Text>
        <TextInput style = {styles.input}
               placeholder = "Nombre"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(text) => setCrear({...crear, nombre: text})}/>
         <Text style={{fontWeight: 'bold',}}> Descripcion</Text>
        <TextInput style = {styles.input}
               placeholder = "Ingresa la descripcion del animal"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(text) => setCrear({...crear, descripcion: text})}/>

                  <Text style={{fontWeight: 'bold',}}> Fecha de nacimiento</Text>
        <TextInput style = {styles.input}
               placeholder = "Ingresa la fecha aproximada de nacimiento"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {(text) => setCrear({...crear, fecha_de_nacimiento: text})}/> 
                   
                   <Text style={{fontWeight: 'bold',}}> Tamaño</Text>

<View style={styles.container2}>
<TouchableOpacity onPress={() => setCrear({...crear, tamaño: "pequeño"})}>
{ crear.tamaño === "pequeño" ?
<Image 

                source={require('../../images/perro_rosa.png')}
           
                style={styles.perrochico}
            /> : <Image 

            source={require('../../images/perro_negro.png')}
       
            style={styles.perrochico}
        />}
        
        </TouchableOpacity>
<TouchableOpacity onPress={() => setCrear({...crear, tamaño: "mediano"})}>
{ crear.tamaño === "mediano" ? 
<Image 
                source={require('../../images/perro_rosa.png')}
                style={styles.mediano}
            />
            : 
            <Image 
            source={require('../../images/perro_negro.png')}
                style={styles.mediano}
            />}
            </TouchableOpacity>


            
            <TouchableOpacity onPress={() => setCrear({...crear, tamaño: "grande"})}>
            { crear.tamaño === "grande" ?     
<Image 
                source={require('../../images/perro_rosa.png')}
                style={styles.grande}
            />
            :
            <Image 
            source={require('../../images/perro_negro.png')}
                style={styles.grande}
            />
    }
            </TouchableOpacity>

</View>
            {/* <ButtonYellow
            text= "asd"
            onPress={()=> alert("apretastes el boton")}
            />
             */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
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