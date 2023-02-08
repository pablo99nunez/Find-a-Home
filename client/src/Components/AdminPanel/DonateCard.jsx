import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DeletePet, UserBan } from "../../Redux/Actions";
import { useDispatch } from "react-redux";
const DonateCard = (props) => {
const {profilePic, firstName, name, lastName, donaciones } = props.item

    return (
  <View className="bg-[#009ee3] m-[2%] px-[5%] py-[5%] rounded-2xl">
    <View className="flex flex-row justify-between items-center my-[5%]">
      <Image
        resizeMode="contain"
        className="h-[120%] w-[30%] rounded-xl mr-[5%]"
        source={{ uri: profilePic ? profilePic : props.item.profilePic}}
        />
      <View className="w-[60%]">
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-2xl font-semibold text-white">{name ? name[0].toUpperCase().concat(name.toLowerCase().substring(1)) : firstName[0].toUpperCase().concat(firstName.toLowerCase().substring(1)) + " " + lastName[0].toUpperCase().concat(lastName.toLowerCase().substring(1))}</Text>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-white">
        {/* Ultimo reporte: {reportes[reportes.length-1].denuncia} */}
        </Text>
        <Text style={{ fontFamily: "Roboto_300Light" }} className="text-white">
        Ultima donacion: {donaciones ? donaciones[0] + "$ ARS": null}
        </Text>
       
      </View>
    </View>
    
  </View>
      );
  
    }

export default DonateCard;