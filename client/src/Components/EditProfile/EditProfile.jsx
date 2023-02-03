import React from "react";
import { Photos } from "./Photo";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { EditProfiles } from "../../Redux/Actions";

const EditProfile = (props) => {

  const { firstName, lastName, phone, profilePic, address, description } = props.route.params
  const [profile, setProfile] = useState({
    firstName: firstName ? firstName : "",
    lastName: lastName ? lastName : "",
    phone: phone ? phone : "",
    profilePic: profilePic ? profilePic : "",
    address: address ? address : "",
    description: description ? description : ""
  })
  // console.log(props.route.params)
  const HandleSubmit = async () => {
    const DatosPetAEnviar = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      profilePic: profile.profilePic,
      address: profile.address,
      phone: profile.phone,
      description: profile.description
    };

    await EditProfiles(DatosPetAEnviar)
      .then((sucess) => {
        alert("Su perfil a sido actualizado");
        props.navigation.navigate("UserDetail");
      })
      .catch((error) => {
        console.error("⚠️ Error -> 🚨 EditProfile -> 🔔 EditProfiles: " + error.message)
      })
      .finally((e) => {
        setProfile({
          firstName: "",
          lastName: "",
          phone: "",
          profilePic: "",
          address: "",
          description:"",
        });
      });
  }


  return (
    <ScrollView className='bg-[#d9d9d9]'>

      <View className='w-10/12 mx-auto'>
        <Photos profile={profile} setProfile={setProfile} name={profile.name} />

        <View>
          <Text className='text-2xl font-extralight m-2'>Nombre</Text>

          <TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu nombre"
            placeholderTextColor="#fcfcfc"
            value={profile.firstName}
            onChangeText={(text) => setProfile({ ...profile, firstName: text })}

          />
        </View>
        <View>
          <Text className='text-2xl font-extralight m-2'>Apellido</Text>

          <TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu Apellido"
            placeholderTextColor="#fcfcfc"
            value={profile.lastName}
            onChangeText={(text) => setProfile({ ...profile, lastName: text })}
            maxLength={20}
          />
        </View>
        <View>
          <Text className='text-2xl font-extralight m-2'>Telefono</Text>

          <TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu telefono"
            placeholderTextColor="#fcfcfc"
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            maxLength={20}
          />
        </View>
        <View>
          <Text className='text-2xl font-extralight m-2'>Direccion</Text>

          <TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu direccion"
            placeholderTextColor="#fcfcfc"
            value={profile.address}
            onChangeText={(text) => setProfile({ ...profile, address: text })}
            maxLength={20}
          />
        </View>

        <View>
          <Text className='text-2xl font-extralight m-2'>Acerca de mi</Text>

          <TextInput
            multiline={true}
            className='h-20 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Describete para tener mas posibilidades de adopcion"
            placeholderTextColor="#fcfcfc"
            value={profile.description}
            onChangeText={(text) => setProfile({ ...profile, description: text })}
            maxLength={140}
          />
        </View>

        <View className="my-[10%]">
          <ButtonYellow onPress={() => HandleSubmit()} text={"Editar"} />

        </View>
      </View>
    </ScrollView>
  )
}

export default EditProfile