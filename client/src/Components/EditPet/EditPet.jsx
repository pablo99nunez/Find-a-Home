import React from "react";
import {
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { PetEdit } from "../../Redux/Actions/index";
import { ButtonYellow } from "../Buttons/Buttons";
import FormPet from "../CreatePet/FormPet";
import FormPetsTwo from "../CreatePet/FormPetsTwo";


const EditPet = (props) => {
  const { name, description, birthday, size, profilePic, gallery, specie, state, email, id } = props.route.params
  const [crear, setCrear] = useState({
    name,
    description,
    birthday,
    size,
    profilePic,
    gallery,
    specie,
    state,
  });
  const [error, setError] = useState({});

  const HandleSubmit = async () => {
    const DatosPetAEnviar = {
      name: crear.name,
      description: crear.description,
      profilePic: crear.profilePic ||
        "https://us.123rf.com/450wm/natbasil/natbasil1601/natbasil160100031/52068222-animales-siluetas-perro-gato-y-conejo-logotipo-de-la-tienda-de-animales-o-cl%C3%ADnica-veterinaria-ilustr.jpg?ver=6",
      gallery: crear.gallery,
      state: crear.state,
      email: email,
      id: id,

    };
    await PetEdit(DatosPetAEnviar)
      .then((sucess) => {
        props.navigation.navigate("UserDetail")
      })
      .catch((err) => {
        console.error("⚠️ Error -> 🚨 EditPet -> 🔔 PetEdit: " + err.message);
      })

  };
  
  const [paginas, setPaginas] = useState(1)
  
  return (
    <ScrollView className="bg-[#d9d9d9]">
        {paginas === 1  ?
       <FormPet
       setCrear={setCrear}
       crear={crear}
       error={error}
       setError={setError}
     />
        :
        <FormPetsTwo
        setCrear={setCrear}
        crear={crear}
        error={error}
        setError={setError}
      />  
          }
    <View className="my-[10%]">
      {paginas === 1 && !error.size && !error.state && !error.specie ?

    <ButtonYellow onPress={() => setPaginas(2) } text="Siguiente"/>

:          
    
      <ButtonYellow onPress={() => HandleSubmit()} text="Editar" />
    }
    </View>
  </ScrollView>
  )
}

export default EditPet