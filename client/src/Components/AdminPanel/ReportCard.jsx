import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DeletePet, UserBan } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
const ReportCard = (props) => {
const {profilePic, name, id, reportes, owner } = props.item
const dispatch = useDispatch()
const deletePets = (id) =>{

    dispatch(DeletePet(id))
    alert("Mascota eliminada")
}
const banUser = (owneremail) =>{
    UserBan(owneremail)
    alert("Usuario bloqueado")
}
    return (
  <View className="bg-[#FFC733] m-[2%] px-[5%] py-[5%] rounded-2xl">
    <View className="flex flex-row justify-between items-center my-[5%]">
      <Image
        resizeMode="contain"
        className="h-[90%] w-[38%] rounded-xl mr-[5%]"
        source={{ uri: profilePic ? profilePic : props.item.profilePic}}
        />
      <View className="w-[60%]">
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-2xl font-semibold">{name ? name[0].toUpperCase().concat(name.toLowerCase().substring(1)) : props.item.firstName[0].toUpperCase().concat(props.item.firstName.toLowerCase().substring(1)) + " " + props.item.lastName[0].toUpperCase().concat(props.item.lastName.toLowerCase().substring(1))}</Text>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
        {/* Ultimo reporte: {reportes[reportes.length-1].denuncia} */}
        </Text>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
        Cantidad de reportes: {reportes ? reportes.length : props.item.infracciones.length}
        </Text>
        {!props.item.address ? 
        <View>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">Propietario:</Text>
          <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">{owner ? owner : null}</Text>
        </View>
        : 
        null
      }
      </View>
    </View>
    <View className="flex flex-row justify-between">
      <TouchableOpacity onPress={() => deletePets(props?.id)}>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[6%] rounded-xl">Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => banUser(owner ? owner : props.item.email)}>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="bg-[#AB4E68] text-[#d9d9d9] py-[3%] px-[6%] rounded-xl">Bloquear usuario</Text>
      </TouchableOpacity>
    </View>
  </View>
      );
  
    }

export default ReportCard;