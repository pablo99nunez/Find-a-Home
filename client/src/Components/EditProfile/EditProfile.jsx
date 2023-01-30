import React from "react";
import { useSelector } from "react-redux";
import { Photos } from "./Photo";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput} from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { ButtonYellow } from "../Buttons/Buttons";
import { EditProfiles } from "../../Redux/Actions";


 const EditProfile = (props) =>{
const {firstName, name, phone, profilePic, address} = props.route.params
const [profile, setProfile] = useState({
    name: name ? name : "",
    firstName: firstName ? firstName : "",
    phone: phone ? phone : "",
    profilePic: profilePic ? profilePic : "",
    address : address ? address : ""
})
const HandleSubmit = async () => {
    const DatosPetAEnviar = {
        name: profile.name,
        firstName: profile.firstName,
        profilePic: profile.profilePic,
        address: profile.address,
        phone: profile.phone,
        email: props.route.params.email,

      };
      await EditProfile(DatosPetAEnviar)
        .then((sucess) => {
          alert("Su perfil a sido actualizado");
          navigation.goBack();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally((e) => {
          setCrear({
            name: "",
            firstName: "",
            phone: "",
            profilePic: "",
            address: "",
          });
        });
    } 
    

return(
    <ScrollView>
<View>
<Photos profile={profile} setProfile={setProfile} name = {profile.name}/>
</View>
<View>
<Text className='text-2xl font-extralight mb-3'>Nombre</Text>

<TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu nombre"
            placeholderTextColor="#fcfcfc"
            // autoCapitalize="none"
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}

/>
</View>
<View>
<Text className='text-2xl font-extralight mb-3'>Apellido</Text>

<TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu Apellido"
            placeholderTextColor="#fcfcfc"
            // autoCapitalize="none"
            value={profile.firstName}
            onChangeText={(text) => setProfile({ ...profile, firstName: text })}
          maxLength={20}
          />
</View>
<View>
<Text className='text-2xl font-extralight mb-3'>Telefono</Text>

<TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu telefono"
            placeholderTextColor="#fcfcfc"
            // autoCapitalize="none"
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            maxLength={20}
          />
</View>
<View>
<Text className='text-2xl font-extralight mb-3'>Direccion</Text>

<TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Por favor actualiza tu direccion"
            placeholderTextColor="#fcfcfc"
            // autoCapitalize="none"
            value={profile.address}
            onChangeText={(text) => setProfile({ ...profile, address: text })}
            maxLength={20}
          />
</View>
<View className="my-[10%]">
          <ButtonYellow onPress={() => HandleSubmit()} text={"Actualizar perfil"} />
        </View>
</ScrollView>
)
}

export default EditProfile