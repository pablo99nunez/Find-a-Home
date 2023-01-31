import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity, //botton
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { PetEdit } from "../../Redux/Actions/index";

export const EditPerAuxiliar = (props) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState({
    name: props.route.params.name ? props.route.params.name : "",
    description: props.route.params.description
      ? props.route.params.description
      : "",
    profilePic: props.route.params.profilePic
      ? props.route.params.profilePic
      : "",
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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }).catch((err) => {
        console.error("⚠️ Error -> 🚨 EditPetAuxiliar -> 🔔 EditPerAuxiliar: " + err.message);

      });

      if (!result.canceled) {
        await uploadImage(result.assets[0].uri).catch((err) => {
          console.error("⚠️ Error -> 🚨 EditPetAuxiliar -> 🔔 EditPerAuxiliar: " + err.message);
        });
      }
    } catch (err) {
      console.error("⚠️ Error -> 🚨 EditPetAuxiliar -> 🔔 EditPerAuxiliar.catch: " + err);
    }
  };

  const uploadImage = async (imageURI) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageURI, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(`Pictures/${Date.now()}-${edit.name}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (err) => {
        setUploading(false);
        console.log(err);
        if (Platform.OS !== 'web')
          blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL()
          .then((url) => {
            setUploading(false);
            setEdit({ ...edit, profilePic: url });
            if (Platform.OS !== 'web')
              blob.close();
            return url;
          })
          .catch(err => console.error("⚠️ Error -> 🚨 EditPetAuxiliar -> 🔔 Error al obtener la url de la imagen" + err.message))

      }
    );
  };

  const HandleSubmit = async () => {
    if (true) {
      const DatosPetAEnviar = {
        name: edit.name,
        description: edit.description,
        profilePic: edit.profilePic,
        state: selected2,
        id: props.route.params.id,
      };
      await PetEdit(DatosPetAEnviar)
        .then((sucess) => {
          alert("Los datos de tu mascota se han editado exitosamente");
          props.navigation.navigate("UserDetail")
        })
        .catch((err) => {
          console.error("⚠️ Error -> 🚨 EditPetAuxiliar -> 🔔 PetEdit: " + err.message);
        })
        .finally((e) => {
          setEdit({
            name: "",
            description: "",
            profilePic: "",
          });
          setSelected2("");
        });
    } else {
      alert("Por favor completa todos los datos");
    }
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
        <TouchableOpacity onPress={() => pickImage()}>
          <Image style={styles.profilePic} source={{ uri: edit.profilePic }} />
        </TouchableOpacity>

        <Text style={{ fontSize: 30, marginRight: 10 }}>Nombre:</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de tu mascota"
          placeholderTextColor={"#fcfcfc"}
          autoCapitalize="none"
          value={edit.name}
          maxLength={14}
          onChangeText={(text) => setEdit({ ...edit, name: text })}
        />

        <Text style={{ fontSize: 30, marginRight: 10 }}>Descripcion:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descripcion de tu mascota"
          placeholderTextColor={"#fcfcfc"}
          autoCapitalize="none"
          value={edit.description}
          maxLength={140}
          onChangeText={(description) =>
            setEdit({ ...edit, description: description })
          }
        />
        <Text style={{ fontSize: 30, marginRight: 10 }}>
          ¿Estado del animal?
        </Text>
        <SelectList
          setSelected={(dataSave) => setSelected2(dataSave)}
          data={data2}
          save="value"
        />
        <Text style={{ fontSize: 30, marginRight: 10 }}></Text>
        {/* BOTON PARA ACEPTAR EDICION */}
        <TouchableOpacity
          onPress={() => {
            HandleSubmit().catch(err => console.error("⚠️ Error -> 🚨 EditPetAuxiliar -> 🔔 BOTON PARA ACEPTAR EDICION: " + err.message))
          }}
        >
          {Platform.OS === 'web' ?
            <img
              src={require("../../images/buttoncrear.png")}
              style={styles.imagen2}
            />
            :
            <Image
              source={require("../../images/buttoncrear.png")}
              style={styles.imagen2}
            />}
        </TouchableOpacity>
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
