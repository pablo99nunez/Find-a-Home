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
      <View className="	text-align: center">
        <Text className="bg-[#d9d9d9] p-3 rounded-xl m-2 h-10 flex-start align-items: center; 	text-align: center">
          ESTADISTICAS
        </Text>
        <Text>TOTAL MASCOTAS: {pets?.length}</Text>
        <Text>TOTAL MASCOTAS ADOPTABLES: {mascotasAdoptables?.length}</Text>
        <Text>
          TOTAL MASCOTAS NO ADOPTABLES: {mascotasNoAdoptables?.length}
        </Text>
        <Text>PERROS EN ADOPCION {perrosEnAdopcion?.length}</Text>
        <Text>GATOS EN ADOPCION {gatosEnAdopcion?.length}</Text>
        <Text>OTROS EN ADOPCION {otrosEnAdopción?.length}</Text>
        <Text>REPORTES {CantidadDeReportes?.length}</Text>
        <Text>PERROS ADOPTADOS HOY {hoy?.length}</Text>
        <Text>PERROS ADOPTADOS ESTA SEMANA {semana?.length}</Text>
        <Text>PERROS ADOPTADOS ESTE MES {mes?.length}</Text>
      </View>
    </ScrollView>
  );
};

export default AdminPanel;
