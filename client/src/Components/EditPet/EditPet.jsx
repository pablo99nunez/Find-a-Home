import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, //botton
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch } from "react-redux";
import { PetEdit } from "../../Redux/Actions/index";
import { Photos } from "../CreatePet/Photos";
import { ButtonYellow } from "../Buttons/Buttons";


const EditPet = (props) => {
  const dispatch = useDispatch();

  const [crear, setCrear] = useState({
    name: props.route.params.name ? props.route.params.name : "",
    description: props.route.params.description
      ? props.route.params.description
      : "",
      galeria: props.route.params.gallery
      ? props.route.params.gallery
      : [],
    status: props.route.params.status ? props.route.params.status : selected2,
  });

  const data2 = [
    { key: "1", value: "Adoptable" },
    { key: "2", value: "Lost" },
    { key: "3", value: "Found" },
    { key: "3", value: "InAdoptionProcess" },
    { key: "3", value: "NotAdoptable" },
  ];
  const [selected2, setSelected2] = useState("");
  const [uploading, setUploading] = useState(false);


  const HandleSubmit = async () => {
      const DatosPetAEnviar = {
        name: crear.name,
        description: crear.description,
        profilePic: crear.profilePic,
        gallery: [...crear.galeria.slice(1)],
        state: selected2,
        id: props.route.params.id,
        email: props.route.params.email,

      };
      await PetEdit(DatosPetAEnviar)
        .then((sucess) => {
            alert("Los datos de tu mascota se han editado exitosamente");
            props.navigation.navigate("UserDetail")
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally((e) => {
          setCrear({
            name: "",
            description: "",
            profilePic: "",
          });
          setSelected2("");
        });
  };
  return (
    <>
    {/* BOTON PARA VOLVER HACIA ATRAS */}
    <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={require("../../images/flecha.png")}
            style={{ width: 20, height: 20, marginRight: 30, marginTop: 60 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, marginTop: 50 }}>Editar mascota:</Text>
      </View>
      <ScrollView style={styles.container}>
        {/* BOTON PARA CAMBIAR FOTO DE PERFIL */}
        {/* <TouchableOpacity onPress={() => pickImage()}>
          <Image style={styles.profilePic} source={{ uri: edit.profilePic }} />
        </TouchableOpacity> */}

<Text className='text-2xl font-extralight mb-3'>Nombre</Text>

<TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Nombre de tu mascota"
            placeholderTextColor="#fcfcfc"
            autoCapitalize="none"
            value={crear.name}
            maxLength={15}
            // onBlur={() => {
            //   const wrongName = validateName(crear.name)
            //   if(wrongName) setError({...error, name : 'El nombre no puede contener caracteres especiales'})
            //   else{ setError({...error, name: ''})}
            // }}
            // onChangeText={
            //   (text) => setCrear({ ...crear, name: text })
            // }
          />

<Text className='text-2xl font-extralight mb-3'>Descripcion</Text>
        <TextInput
          className='bg-[#717171] h-24 rounded-md px-3 font-light pt-6'
          multiline={true}
          numberOfLines={4}
          placeholder="Cómo es? describe a tu mascota...
          Necesita alguna vacúna o atencion veterinaria?"
          placeholderTextColor="#fcfcfc" 
          autoCapitalize="none"
          value={crear.description}
          onChangeText={(text) => setCrear({ ...crear, description: text })}
          // onBlur={() => {
          //   const wrongDesc = validateDesc(crear.description)
          //   if(wrongDesc) setError({...error, description: 'Por favor agrega una descripcion'})
          //   else{setError({...error, description: ''})}
          
        />
<Text className='text-2xl font-extralight mb-3'>Estado Del animal:</Text>

        <SelectList
          setSelected={(dataSave) => setSelected2(dataSave)}
          data={data2}
          save="value"
        />
        <Photos name={setCrear.name} setCrear={setCrear} crear={crear}/>
        <Text style={{ fontSize: 30, marginRight: 10 }}></Text>
          {/* BOTON PARA ACEPTAR EDICION */}
          <View className="my-[10%]">
          <ButtonYellow onPress={() => HandleSubmit()} text={"Editar"} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  imagen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
  },
  imagen2: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  perrochico: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginTop: 30,
  },
  mediano: {
    width: 80,
    height: 80,
    marginLeft: 120,
    marginTop: -70,
    marginTop: 30,
  },
  grande: {
    width: 100,
    height: 100,
    marginLeft: 250,
    marginTop: -90,
    marginTop: 30,
  },

  input: {
    margin: 15,
    height: 40,
    borderWidth: 1,
    backgroundColor: "#656568",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
  profilePic: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 50,
    marginLeft: 90,
  },
  perrochico: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  mediano: {
    width: 80,
    height: 80,
    marginLeft: 120,
    marginTop: -70,
  },
  grande: {
    width: 100,
    height: 100,
    marginLeft: 250,
    marginTop: -90,
  },
});

export default EditPet;
