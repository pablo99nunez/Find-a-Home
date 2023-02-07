import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DeletePet, UserBan } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
const DonateCard = (props) => {
const {profilePic, firstName, name, lastName, donaciones } = props.item

    return (
  <View className="bg-[#FFC733] m-[2%] px-[5%] py-[5%] rounded-2xl">
    <View className="flex flex-row justify-between items-center my-[5%]">
      <Image
        resizeMode="contain"
        className="h-[90%] w-[38%] rounded-xl mr-[5%]"
        source={{ uri: profilePic ? profilePic : props.item.profilePic}}
        />
      <View className="w-[60%]">
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-2xl font-semibold">{name ? name[0].toUpperCase().concat(name.toLowerCase().substring(1)) : firstName[0].toUpperCase().concat(firstName.toLowerCase().substring(1)) + " " + lastName[0].toUpperCase().concat(lastName.toLowerCase().substring(1))}</Text>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
        {/* Ultimo reporte: {reportes[reportes.length-1].denuncia} */}
        </Text>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-gray-600">
        Ultima donacion: {donaciones ? donaciones[0]: null}
        </Text>
       
      </View>
    </View>
    
  </View>
      );
  
    }

export default DonateCard;