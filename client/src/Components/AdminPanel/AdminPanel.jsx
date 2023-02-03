import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView} from "react-native";


const AdminPanel = ({ navigation, route }) => {
  
  return (
    <ScrollView>
      <View className='mx-auto'>

        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-3' onPress={() =>navigation.navigate("Reports")}>
          <Text className='text-xl font-thin mx-auto'>Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity className='bg-[#d9d9d9] p-5 rounded-xl m-3' onPress={() => {alert('Donaciones')}}>
          <Text className='text-xl font-thin'>Donaciones</Text>
          <Image
          className="w-14 h-14 mx-auto"
          resizeMode={"contain"}
          source={require("../../images/buttonDonation.png")}
          />
        </TouchableOpacity>

      </View>
      
    </ScrollView>
  );
};

export default AdminPanel;
