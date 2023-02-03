import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Button} from "react-native";



const AdminPanel = ({ navigation, route }) => {

  return (
    <ScrollView>

      <View className='mx-auto'>

        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() =>navigation.navigate("Reports")}>
          <Text className='text-xl font-thin mx-auto'>Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() =>navigation.navigate("Usuarios")}>
          <Text className='text-xl font-thin mx-auto'>Usuarios</Text>
        </TouchableOpacity>        
        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-2' onPress={() => {alert('Donaciones')}}>
          <Text className='text-xl font-thin'>Donaciones</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
};

export default AdminPanel;
