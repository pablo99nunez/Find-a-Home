import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler'
import { validateBirthday, validateDesc, validateName } from './validations';
import { Photos } from './Photos';

export default FormPetsTwo = ({setCrear, crear, error, setError}) => {

  return (
    
    <ScrollView className='bg-[#d9d9d9] flex px-[7%]'>


<View>
        <Text className='text-2xl font-extralight mb-3'>Estado del animal</Text>
        <View className='flex flex-row justify-center flex-wrap'>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state:'Adoptable'})}}
          className={crear.state === 'Adoptable'?
           "self-start rounded-full bg-[#AB4E68] p-3 m-2" :
            'self-start rounded-full bg-[#77747470] p-3 m-2'}>
              <Text>En Adopcion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state: 'Lost'})}}
          className={crear.state === 'Lost'?
           "self-start rounded-full bg-[#AB4E68] p-3 m-2" :
            'self-start  rounded-full bg-[#77747470] p-3 m-2'}>
              <Text>Perdido</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state: 'Found'})}}
          className={crear.state === 'Found'?
           "self-start  rounded-full bg-[#AB4E68] p-3 m-2" :
            'self-start  rounded-full bg-[#77747470] p-3 m-2'}>
              <Text>Encontrado</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state: 'NotAdoptable'})}}
          className={crear.state === 'NotAdoptable'?
           "self-start  rounded-full bg-[#AB4E68] p-3 m-2" :
            'self-start  rounded-full bg-[#77747470] p-3 m-2'}>
              <Text>Fuera de adopcion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {setCrear({...crear, state: 'InAdoptionProcess'})}}
          className={crear.state === 'InAdoptionProcess'?
           "self-start  rounded-full bg-[#AB4E68] p-3 m-2" :
            'self-start  rounded-full bg-[#77747470] p-3 m-2'}>
              <Text>En proceso de adopcion</Text>
          </TouchableOpacity>
        </View>
        <View className='h-5 mt-1'>
            <Text className='text-[#ed3232]'>{error.state}</Text>
          </View>

          <Photos name={crear.name} setCrear={setCrear} crear={crear}/>


      </View>

    </ScrollView>
   
  )
}
