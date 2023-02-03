import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DeletePet, UserBan } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
const ReportCard = (props) => {
const {profilePic, name, id, reportes, owner} = props.item
const dispatch = useDispatch()

const deletePets = (id) =>{
    dispatch(DeletePet(id))
    alert("Mascota eliminada")
}
const banUser = (owneremail) =>{
    dispatch(UserBan(owneremail))
    alert("Usuario bloqueado")
}
    return (
  <View className="flex flex-row justify-between items-center mt-[10%] mb-[5%] pl-[5%] pr-[5%]">
      <View style={{
          width: "40%",
          height: 100,
          backgroundImage: "linear-gradient",
        }}>
    <Image
      className="relative h-[100%] w-[90%] rounded-3xl float-left"
      source={{ uri: profilePic }}
    />
    </View>
    <View style={{
          width: "60%",
          height: 100,
          backgroundImage: "linear-gradient",
        }}>
      <Text className="text-2xl font-semibold">{name}</Text>
      <Text className="text-gray-600">
       {/* Ultimo reporte: {reportes[reportes.length-1].denuncia} */}
      </Text>
      <Text className="text-gray-600">
       Cantidad de reportes: {reportes.length}
      </Text>
      <Text className="text-gray-600">
       Propietario: {owner}
      </Text>
      <TouchableOpacity onPress={() => deletePets(props?.id)}>
<Text>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => banUser(owner)}>
<Text>Bloquear usuario</Text>
      </TouchableOpacity>
      
      </View>

  </View>
      );
    }

export default ReportCard;