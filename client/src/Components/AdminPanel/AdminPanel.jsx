import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useSelector } from "react-redux";

const AdminPanel = ({ navigation, route }) => {
  const mascotas = useSelector((state) => state.allPets);
  console.log(mascotas.payload);

  const mascotasAdoptables = mascotas.payload.filter(
    (m) => m.state === "Adoptable"
  );
  const mascotasNoAdoptables = mascotas.payload.filter(
    (m) => m.state !== "Adoptable"
  );
  return (
    <ScrollView>
      <View className="flex flex-row justify-between items-center mt-[10%] mb-[5%] pl-[5%] pr-[5%]">
        <TouchableOpacity
          className="bg-[#d9d9d9] p-3 rounded-xl m-2"
          onPress={() => navigation.navigate("Reports")}
        >
          <Text className="text-xl font-thin mx-auto">Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#d9d9d9] p-3 rounded-xl m-2"
          onPress={() => navigation.navigate("Usuarios")}
        >
          <Text className="text-xl font-thin mx-auto">Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#d9d9d9] p-3 rounded-xl m-2"
          onPress={() => {
            alert("Donaciones");
          }}
        >
          <Text className="text-xl font-thin">Donaciones</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>ESTADISTICAS</Text>
        <Text>TOTAL MASCOTAS: {mascotas.payload.length}</Text>
        <Text>TOTAL MASCOTAS ADOPTABLES: {mascotasAdoptables.length}</Text>
        <Text>TOTAL MASCOTAS NO ADOPTABLES: {mascotasNoAdoptables.length}</Text>
      </View>
    </ScrollView>
  );
};

export default AdminPanel;
