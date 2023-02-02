import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DeletePet, UserBan } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
const ReportCard = (props, {navigation}) => {

const {id} = props
const dispatch = useDispatch()

const deletePets = (id) =>{
    dispatch(DeletePet(id))
    alert("Mascota eliminada")
}
const banUser = (owneremail) =>{
    dispatch(UserBan(owneremail))
    alert("Mascota eliminada")
}
    return (
  <View className="flex flex-row justify-between items-center mt-[10%] mb-[5%] pl-[5%] pr-[5%]">
      <View style={{
          width: "40%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}>
    <Image
      className="relative h-[40%] w-[90%] rounded-3xl float-left"
      source={{ uri: props.imagen }}
    />
    </View>
    <View style={{
          width: "60%",
          height: 350,
          backgroundImage: "linear-gradient",
        }}>
      <Text className="text-2xl font-semibold">{props.name}</Text>
      <Text className="text-gray-600">
       Ultimo reporte: {props.reportes[props.reportes.length-1]}
      </Text>
      <Text className="text-gray-600">
       Cantidad de reportes: {props.reportes.length}
      </Text>
      <Text className="text-gray-600">
       Propietario: {props.propietario}
      </Text>
      <TouchableOpacity onPress={() => deletePets(props.id)}>
<Text>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => banUser(props.propietario)}>
<Text>Bloquear usuario</Text>
      </TouchableOpacity>
      
      </View>

  </View>
      );
    }

export default ReportCard;