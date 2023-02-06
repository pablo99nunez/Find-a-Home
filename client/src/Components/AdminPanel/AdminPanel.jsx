import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import { useFocusEffect } from "@react-navigation/native";
import { useState } from "react";

const AdminPanel = ({ navigation, route }) => {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [hoy, setHoy] = useState();
  const [semana, setSemana] = useState();
  const [mes, setMes] = useState();
  const [pets, setPets] = useState();

  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/admin/getAllPets`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setPets(response.data));
          await axios
            .get(`${BASE_URL_IP}/admin/analytics/day`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setHoy(response.data));
          await axios
            .get(`${BASE_URL_IP}/admin/analytics/week`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setSemana(response.data));
          await axios
            .get(`${BASE_URL_IP}/admin/analytics/month`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setMes(response.data));
        } catch (error) {
          console.error(error.message);
        }
      }
      evitaReturnDelUseEffect();
    }, [])
  );

  const mascotasAdoptables = pets?.filter((m) => m.state === "Adoptable");
  const mascotasNoAdoptables = pets?.filter((m) => m.state !== "Adoptable");
  const perrosEnAdopcion = pets?.filter((m) => m.specie === "Perro");
  const gatosEnAdopcion = pets?.filter((m) => m.specie === "Gato");
  const otrosEnAdopción = pets?.filter((m) => m.specie === "Otro");
  const CantidadDeReportes = pets?.filter((m) => m.reportes.length);

  return (
    <ScrollView>
      <View className="flex flex-row justify-between items-center mx-[5%]">
        <TouchableOpacity
          className="bg-[#AB4E68] p-3 rounded-xl m-2"
          onPress={() => navigation.navigate("Reports")}
        >
          <Text className="text-[#d9d9d9] text-xl font-thin mx-auto">Reportes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#AB4E68] p-3 rounded-xl m-2"
          onPress={() => navigation.navigate("Usuarios")}
        >
          <Text className="text-[#d9d9d9] text-xl font-thin mx-auto">Usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#AB4E68] p-3 rounded-xl m-2"
          onPress={() => {
            alert("Donaciones");
          }}
        >
          <Text className="text-[#d9d9d9] text-xl font-thin">Donaciones</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-[#d9d9d9] m-[3%] rounded-3xl">
        <Text className="p-3 flex-start items-center text-center">
          ESTADISTICAS:
        </Text>
        <View>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 flex-start items-center text-center">TOTAL MASCOTAS: {pets?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 flex-start items-center text-center">TOTAL MASCOTAS ADOPTABLES: {mascotasAdoptables?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">TOTAL MASCOTAS NO ADOPTABLES: {mascotasNoAdoptables?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">PERROS EN ADOPCION: {perrosEnAdopcion?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">GATOS EN ADOPCION: {gatosEnAdopcion?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">OTROS EN ADOPCION: {otrosEnAdopción?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">REPORTES: {CantidadDeReportes?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">PERROS ADOPTADOS HOY: {hoy?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">PERROS ADOPTADOS ESTA SEMANA: {semana?.length}</Text>
          <Text className="bg-[#FFC733] p-3 rounded-xl m-2 h-10 flex-start items-center text-center">PERROS ADOPTADOS ESTE MES: {mes?.length}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminPanel;
