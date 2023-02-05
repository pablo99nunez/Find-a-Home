import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { DesbanUser, UserBan } from "../../Redux/Actions";
import { useDispatch } from "react-redux";

const UserCard = (props) => {
  const banUser = (owneremail) => {
    UserBan(owneremail);
    alert("Usuario bloqueado");
  };
  const Desban = (owneremail) => {
    DesbanUser(owneremail);
    alert("Usuario bloqueado");
  };
  return (
    <View className="flex flex-row justify-between items-center mt-[10%] mb-[5%] pl-[5%] pr-[5%]">
      <View
        style={{
          width: "40%",
          height: 100,
          backgroundImage: "linear-gradient",
        }}
      >
        <Image
          className="relative h-[100%] w-[90%] rounded-3xl float-left"
          source={{ uri: props.item.profilePic }}
        />
      </View>
      <View
        style={{
          width: "60%",
          height: 100,
          backgroundImage: "linear-gradient",
        }}
      >
        <Text className="text-2xl font-semibold">
          {props.item.firstName + " " + props.item.lastName}
        </Text>

        <Text className="text-gray-600">
          {/* Cantidad de reportes: {props.item.infracciones.length} */}
        </Text>

        <Text className="text-gray-600">
          Description: {props.item.description}
        </Text>
        <Text className="text-gray-600">
          Cantidad de mascotas: {props.item.pets.length}
        </Text>
        {props.item.tipo !== "inhabilitado" ? (
          <TouchableOpacity onPress={() => banUser(props.item.email)}>
            <Text>Bloquear usuario</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => Desban(props.item.email)}>
            <Text>Desbloquear usuario</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserCard;
