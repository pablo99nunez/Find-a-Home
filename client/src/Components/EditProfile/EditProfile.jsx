import React, { useEffect } from "react";
import { Photos } from "./Photo";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { EditProfiles } from "../../Redux/Actions";
import Condition from "../Register/Entering/Condition";

const EditProfile = (props) => {

  const { firstName, lastName, phone, profilePic, address, description, conditions } = props.route.params
  const [profile, setProfile] = useState({
    firstName: firstName ? firstName : "",
    lastName: lastName ? lastName : "",
    phone: phone ? phone : "",
    profilePic: profilePic ? profilePic : "",
    address: address ? address : "",
    description: description ? description : "",
    conditions: conditions ? conditions : {}
  })
  
  const HandleSubmit = async () => {
    const DatosPetAEnviar = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      profilePic: profile.profilePic,
      address: profile.address,
      phone: profile.phone,
      description: profile.description,
      conditions: profile.conditions
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
  const [checkState, setCheckState] = useState({})

	const HandleCheck = (option) => {
		setCheckState({ ...checkState, [option]: !checkState[option] })
		setProfile({ ...profile, conditions: { ...profile.conditions, [option]: !checkState[option] } })
	}

  useEffect(()=>{
    setCheckState({...checkState, ...conditions})
  }, [])
  const [extras, setExtras] = useState(false)
  return (
    <ScrollView className='bg-[#d9d9d9]' >

      <View className='w-10/15 mx-[5%]'>
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
        <Text className='text-2xl font-extralight m-2'>¿Cambiaron tus condiciones?</Text>

				<View className="flex flex-row flex-wrap items-center justify-center mx-auto">
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Techo"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Vacunas"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Paseos Diarios"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Castración"} />
					<Condition HandleCheck={HandleCheck} checkState={checkState} ConditionName={"Alimento Balanceado"} />
				</View>
        <View className="my-[10%]">
          <ButtonYellow onPress={() => HandleSubmit()} text={"Editar"} />

        </View>
      </View>
    </ScrollView>
  )
}

export default EditProfile