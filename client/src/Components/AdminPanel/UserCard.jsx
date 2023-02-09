import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DesbanUser, UserBan, MakeAdmin, QuitarAdmin } from "../../Redux/Actions";
import { useState } from "react";

const UserCard = (props, { navigation }) => {

  const [admin, setAdmin] = useState()
  const [tipo,setTipo] = useState(props.item.tipo)
  const banUser = (owneremail) => {
    UserBan(owneremail);
    setTipo('inhabilitado')
    alert("Usuario bloqueado");
  };
  const AdminUser = (owneremail) => {
    MakeAdmin(owneremail);
    setAdmin(true)
    setTipo('Admin')
    alert("El usuario ahora es administrador");
  };
  const QuitarAdmin = (owneremail) => {
    MakeAdmin(owneremail);
    setAdmin(false)
    setTipo('User')

    alert("El usuario ya no es administrador");
  };
  const Desban = (owneremail) => {
    DesbanUser(owneremail);
    setTipo('User')
    alert("Usuario desbloqueado");
  };

React.useEffect(() =>{
if(props?.tipo?.admin === "Admin") setAdmin(true)
}, [admin])

  return (
    <View className="bg-[#FFC733] m-[2%] px-[5%] py-[5%] rounded-2xl flex flex-col">
      <View className="flex flex-row justify-between items-center my-[5%]">
        <Image
          resizeMode="contain"
          className="h-[90%] w-[30%] rounded-xl mr-[5%]"
          source={props.item.profilePic ? { uri: props.item.profilePic } : require('../../images/perro_negro.png')}
          />
        <View className="w-[60%]">
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-2xl font-semibold">
            { props.item.firstName ? props.item.firstName[0].toUpperCase().concat(props.item.firstName.toLowerCase().substring(1)) + " " + props.item.lastName[0].toUpperCase().concat(props.item.lastName.toLowerCase().substring(1)) : props.item.name[0].toUpperCase().concat(props.item.name.toLowerCase().substring(1))}
          </Text>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
             {props.item.infracciones ? "Cantidad de reportes:" + props.item.infracciones.length : null}
          </Text>
          {props.item.owner ? 

           <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
           Estado: {props.item.status ? props.item.status : null}
         </Text>
          :
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
            Descripcion: {props.item.description ? props.item.description: null}
          </Text>

          }
          {props.item.owner ? 
            <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
            dueño de la mascota: {props.item.pets ? props.item.pets.length : props.item.owner}
          </Text> 
          :
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
            Cantidad de mascotas: {props.item.pets.length ? props.item.pets.length : null}
          </Text>
            }
        </View>
      </View>
      <View className="flex flex-row justify-between">
      {props.item.owner ?
                <TouchableOpacity onPress={() => props.navigation.navigate("Profile", props.item.owner)}>
                <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Perfil del Dueño</Text>
              </TouchableOpacity>
              
    :
      null
          }   
        {props.item.owner ?
                <TouchableOpacity onPress={() => props.navigation.navigate("UserPets", props.item.owner)}>
                <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Mascotas del dueño</Text>
              </TouchableOpacity>
              
    :
        <TouchableOpacity onPress={() => props.navigation.navigate("UserPets", props.item.email)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Mascotas del usuario</Text>
        </TouchableOpacity>
          }
        {!props.item.owner ?
        tipo !== "inhabilitado" ? (
        <TouchableOpacity onPress={() => banUser(props.item.email)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Bloquear usuario</Text>
        </TouchableOpacity>
        
        ) : (
        <TouchableOpacity onPress={() => Desban(props.item.email ? props.item.email : null)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Desbloquear usuario</Text>
        </TouchableOpacity>
            )
        : null  }
        {!props.item.owner ? tipo !== "Admin" || !admin ?

                <TouchableOpacity onPress={() => AdminUser(props.item.email)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Hacer Admin</Text>
        </TouchableOpacity>
        : <TouchableOpacity onPress={() => QuitarAdmin(props.item.email)}>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[1%] rounded-xl">Quitar Admin</Text>
      </TouchableOpacity>:null }
      </View>
    </View>
  );
};
export default UserCard;