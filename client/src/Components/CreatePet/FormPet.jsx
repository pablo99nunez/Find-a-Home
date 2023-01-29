import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler'
import { validateBirthday, validateDesc, validateName } from './validations';
import { Photos } from './Photos';

export default FormPet = ({setCrear, crear, error, setError}) => {


  return (
    
    <ScrollView className='bg-[#d9d9d9] flex px-[7%]'>
      <View>
        <Text className='text-2xl font-extralight mb-3'>Nombre</Text>
        <TextInput
            className='h-11 bg-[#717171] rounded-md px-3 font-light'
            placeholder="Nombre de tu mascota"
            placeholderTextColor="#fcfcfc"
            autoCapitalize="none"
            value={crear.name}
            maxLength={15}
            onBlur={() => {
              const wrongName = validateName(crear.name)
              if(wrongName) setError({...error, name : 'El nombre no puede contener caracteres especiales'})
              else{ setError({...error, name: ''})}
            }}
            onChangeText={
              (text) => setCrear({ ...crear, name: text })
            }
          />
          <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.name}</Text>
          </View>
      </View>

      <View>
        <Text className='text-2xl font-extralight mb-3'>Descripcion</Text>
        <TextInput
          className='bg-[#717171] h-24 rounded-md px-3 font-light pt-6'
          multiline={true}
          numberOfLines={4}
          placeholder="Cómo es? describe a tu mascota...
          Necesita alguna vacúna o atencion veterinaria?"
          placeholderTextColor="#fcfcfc" 
          autoCapitalize="none"
          value={crear.description}
          onChangeText={(text) => setCrear({ ...crear, description: text })}
          onBlur={() => {
            const wrongDesc = validateDesc(crear.description)
            if(wrongDesc) setError({...error, description: 'Por favor agrega una descripcion'})
            else{setError({...error, description: ''})}
          }}
        />
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.description}</Text>
          </View>
      </View>

      <View>
        <Text className='text-2xl font-extralight mb-3'>Fecha de Nacimiento</Text>
        <TextInput
          className='h-11 bg-[#717171] rounded-md px-3 font-light'
          placeholder="Cuando nacio? AAAA/MM/DD"
          placeholderTextColor="#fcfcfc"
          autoCapitalize="none"
          value={crear.birthday}
          onChangeText={(text) => setCrear({ ...crear, birthday: text })}
          onBlur={() => {
            const wrongBirth = validateBirthday(crear.birthday)
            if(wrongBirth) setError({...error, birthday: 'La fecha debe estar en el formato AAAA/MM/DD'})
            else setError({...error, birthday:''})
          }}
        />
         <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.birthday}</Text>
          </View>
      </View>

      <View>
        <Text className='text-2xl font-extralight'>Tamaño</Text>
        <View className='flex flex-row items-end justify-center'>
          <TouchableOpacity
          onPressIn={() => setCrear({...crear, size: 'small'})}
          >
            {crear.size === "small" ? (
              <Image
                source={require("../../images/perro_rosa.png")}
                className='w-10 h-10 mx-3'
              />
            ) : (
              <Image
                source={require("../../images/perro_negro.png")}
                className='w-10 h-10 mx-3'
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => setCrear({...crear, size: 'medium'})}
          >
            {crear.size === "medium" ? (
              <Image
                source={require("../../images/perro_rosa.png")}
                className='w-12 h-12 mx-3'
              />
            ) : (
              <Image
                source={require("../../images/perro_negro.png")}
                className='w-12 h-12 mx-3'
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={() => setCrear({...crear, size: 'large'})}
            >
            {crear.size === "large" ? (
              <Image
                source={require("../../images/perro_rosa.png")}
                className='w-14 h-14 mx-3'
              />
            ) : (
              <Image
                source={require("../../images/perro_negro.png")}
                className='w-14 h-14 mx-3'
              />
            )}
          </TouchableOpacity>
        </View>
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.size}</Text>
          </View>
      </View>

      <View>
        <Text className='text-2xl font-extralight mb-3'>Especie</Text>
        <View className='flex flex-row justify-center'>
          <TouchableOpacity onPress={()=> {setCrear({...crear, specie: 'Perro'})}}
          className={crear.specie === 'Perro'?
           "self-start rounded-full bg-[#AB4E68] p-3 mx-3" :
            'self-start rounded-full bg-[#77747470] p-3 mx-3'}>
              <Text>Perro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, specie: 'Gato'})}}
          className={crear.specie === 'Gato'?
           "self-start rounded-full bg-[#AB4E68] p-3 mx-3" :
            'self-start  rounded-full bg-[#77747470] p-3 mx-3'}>
              <Text>Gato</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, specie: 'Otro'})}}
          className={crear.specie === 'Otro'?
           "self-start  rounded-full bg-[#AB4E68] p-3 mx-3" :
            'self-start  rounded-full bg-[#77747470] p-3 mx-3'}>
              <Text>Otro</Text>
          </TouchableOpacity>
        </View>
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.specie}</Text>
          </View>
      </View>

      <View>
        <Text className='text-2xl font-extralight mb-3'>Estado del animal</Text>
        <View className='flex flex-row justify-center'>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state:'Adoptable'})}}
          className={crear.state === 'Adoptable'?
           "self-start rounded-full bg-[#AB4E68] p-3 mx-3" :
            'self-start rounded-full bg-[#77747470] p-3 mx-3'}>
              <Text>En Adopcion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state: 'Lost'})}}
          className={crear.state === 'Lost'?
           "self-start rounded-full bg-[#AB4E68] p-3 mx-3" :
            'self-start  rounded-full bg-[#77747470] p-3 mx-3'}>
              <Text>Perdido</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state: 'Found'})}}
          className={crear.state === 'Found'?
           "self-start  rounded-full bg-[#AB4E68] p-3 mx-3" :
            'self-start  rounded-full bg-[#77747470] p-3 mx-3'}>
              <Text>Encontrado</Text>
          </TouchableOpacity>
        </View>
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.state}</Text>
          </View>
      </View>

      <Photos name={crear.name} setCrear={setCrear} crear={crear}/>

    </ScrollView>
   
  )
}


