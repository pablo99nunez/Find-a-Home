import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import UserCard from "./UserCard";
import { useFocusEffect } from "@react-navigation/native";

export default function Usuarios({ navigation }) {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [usuarios, setUsuarios] = useState();
  const [filter, setFilter] = useState("user")
  const [search, setSearch] = useState("")
  const [diferent, setDiferent] = useState("usuarios")

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
          .get(`${BASE_URL_IP}/${filter}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setUsuarios(response.data));
            console.log("asd")
        } catch (error) {
          console.error(error.message);
        }
      }
      evitaReturnDelUseEffect();
    }, [filter])
  );

 
const userBoton = () =>{
  setFilter("user")
  setDiferent("usuarios")
}
const petBoton = () =>{
  setFilter("admin/getAllPets")
  setDiferent("pets")
}

const usersInhabilitados = () => {
  //Mostrar baneados además de setear los estados para que se muestren de forma correcta los botones (Todos los usuarios arriba)
  setFilter("user");
  setDiferent("usuarios");
  setFilter("admin/userban");
};
  return (
    <View>
      {diferent  !== "usuarios" ? 
        <TouchableOpacity className='bg-[#AB4E68] p-5 rounded-xl m-2' onPress={() =>userBoton()}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className='text-[#d9d9d9] text-xl font-thin mx-auto'>Todos los usuarios</Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity className='bg-[#AB4E68] p-5 rounded-xl m-2' onPress={() =>petBoton()}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className='text-[#d9d9d9] text-xl font-thin mx-auto'>Todos las mascotas</Text>
        </TouchableOpacity>
        }
        <TouchableOpacity className='bg-[#AB4E68] p-5 rounded-xl m-2' onPress={() => usersInhabilitados()}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className='text-[#d9d9d9] text-xl font-thin mx-auto'>Usuarios inhabilitados</Text>
        </TouchableOpacity>
        {diferent === "usuarios"?
        <Text style={{ fontFamily: "Roboto_300Light" }} className='bg-[#FFC733] text-xl font-thin text-center m-2 p-[2%] rounded-xl'>Cantidad de usuarios: {usuarios?.length}</Text>
        :        
        <Text style={{ fontFamily: "Roboto_300Light" }} className='bg-[#FFC733] text-xl font-thin text-center m-2 p-[2%] rounded-xl'>Cantidad de mascotas: {usuarios?.length}</Text>
      }
    <View>
      <FlatList
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        data={usuarios}
        className="h-[76%]"
        renderItem={({ item }) => (
            <UserCard item={item} navigation={navigation}/>
        )}
      ></FlatList>
    </View>
    </View>
  );
}