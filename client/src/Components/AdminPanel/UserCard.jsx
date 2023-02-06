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
          source={
            props.item.profilePic
              ? { uri: props.item.profilePic }
              : require("../../images/perro_negro.png")
          }
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
          {props.item.firstName
            ? props.item.firstName + " " + props.item.lastName
            : props.item.name}
        </Text>

        <Text className="text-gray-600">
          {/* Cantidad de reportes: {props.item.infracciones.length} */}
        </Text>

        <Text className="text-gray-600">
          Descripcion: {props.item.description ? props.item.description : null}
        </Text>

        {props.item.owner ? (
          <Text className="text-gray-600">
            dueño de la mascota:{" "}
            {props.item.pets ? props.item.pets.length : props.item.owner}
          </Text>
        ) : (
          <Text className="text-gray-600">
            {/* Cantidad de mascotas: {props.item.pets.length ? props.item.pets.length : null} */}
          </Text>
        )}
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("UserPets", props.item.email)
          }
        >
          <Text>Mascotas del usuario</Text>
        </TouchableOpacity>
        {!props.item.owner ? (
          props.item.tipo !== "inhabilitado" ? (
            <TouchableOpacity onPress={() => banUser(props.item.email)}>
              <Text>Bloquear usuario</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Desban(props.item.email ? props.item.email : null)}
            >
              <Text>Desbloquear usuario</Text>
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
};

export default UserCard;
