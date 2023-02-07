import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DesbanUser, UserBan } from "../../Redux/Actions";

const UserCard = (props, { navigation }) => {
  const banUser = (owneremail) => {
    UserBan(owneremail);
    alert("Usuario bloqueado");
  };
  const Desban = (owneremail) => {
    DesbanUser(owneremail);
    alert("Usuario desbloqueado");
  };
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
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
            Descripcion: {props.item.description ? props.item.description: null}
          </Text>
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
        <TouchableOpacity onPress={() => props.navigation.navigate("UserPets", props.item.email)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[6%] rounded-xl">Mascotas del usuario</Text>
        </TouchableOpacity>
        {!props.item.owner ?
        props.item.tipo !== "inhabilitado" ? (
        <TouchableOpacity onPress={() => banUser(props.item.email)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[6%] rounded-xl">Bloquear usuario</Text>
        </TouchableOpacity>
        ) : (
        <TouchableOpacity onPress={() => Desban(props.item.email ? props.item.email : null)}>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[6%] rounded-xl">Desbloquear usuario</Text>
        </TouchableOpacity>
            )
        : null  }
      </View>
    </View>
  );
};
export default UserCard;