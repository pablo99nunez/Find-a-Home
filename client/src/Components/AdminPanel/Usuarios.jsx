import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL_IP } from "@env";
import { auth } from "../../firebase/authentication";
import UserCard from "./UserCard";
import { useFocusEffect } from "@react-navigation/native";

export default function Usuarios({ navigation }) {
  const token = auth.currentUser?.stsTokenManager.accessToken;
  const [usuarios, setUsuarios] = useState([]);
  const [filter, setFilter] = useState("user");
  const [search, setSearch] = useState("");
  const [diferent, setDiferent] = useState("usuarios");
  const [modoMascotas, setModoMascotas] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        try {
          await axios
            .get(`${BASE_URL_IP}/${filter}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => setUsuarios(response.data));
        } catch (error) {
          if (typeof error.response !== "undefined")
            console.error(error.message);
        }
      }
      evitaReturnDelUseEffect();
    }, [filter])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (usuarios.length !== 0) setLoading(false);
    }, [usuarios])
  );

  const userBoton = () => {
    setFilter("user");
    setDiferent("usuarios");
    setModoMascotas(true);
  };
  const petBoton = () => {
    setFilter("admin/getAllPets");
    setDiferent("pets");
    setModoMascotas(false);
  };

  const usersInhabilitados = () => {
    //Mostrar baneados además de setear los estados para que se muestren de forma correcta los botones (Todos los usuarios arriba)
    if (!check2) {
      setFilter("user");
      setDiferent("usuarios");
      setFilter("admin/userban");
    } else {
      setFilter("user");
      setDiferent("usuarios");
    }
    setLoading(true);
    setUsuarios([]);
    setCheck2(!check2);
  };
  return (
    <View>
      <TouchableOpacity
        className="bg-[#AB4E68] p-5 rounded-xl m-2"
        onPress={() => {
          if (!modoMascotas) {
            petBoton();
            setModoMascotas(!modoMascotas);
          } else {
            userBoton();
            setCheck2(!check2);
            setModoMascotas(!modoMascotas);
          }
          setLoading(true);
          setUsuarios([]);
        }}
      >
        <Text
          style={{ fontFamily: "Roboto_300Light" }}
          className="text-[#d9d9d9] text-xl font-thin mx-auto"
        >
          {loading
            ? "Cargando..."
            : !modoMascotas
            ? "Todas las mascotas"
            : "Todos los usuarios"}
        </Text>
      </TouchableOpacity>

      {!modoMascotas ? (
        <TouchableOpacity
          className="bg-[#AB4E68] p-5 rounded-xl m-2"
          onPress={() => usersInhabilitados()}
        >
          <Text
            style={{ fontFamily: "Roboto_300Light" }}
            className="text-[#d9d9d9] text-xl font-thin mx-auto"
          >
            {loading
              ? "Cargando..."
              : check2
              ? "Usuarios Habilitados"
              : "Usuarios inhabilitados"}
          </Text>
        </TouchableOpacity>
      ) : null}
      {diferent === "usuarios" ? (
        <Text
          style={{ fontFamily: "Roboto_300Light" }}
          className="bg-[#FFC733] text-xl font-thin text-center m-2 p-[2%] rounded-xl"
        >
          Cantidad de usuarios: {usuarios?.length}
        </Text>
      ) : (
        <Text
          style={{ fontFamily: "Roboto_300Light" }}
          className="bg-[#FFC733] text-xl font-thin text-center m-2 p-[2%] rounded-xl"
        >
          Cantidad de mascotas: {usuarios?.length}
        </Text>
      )}
      <View>
        <FlatList
          initialNumToRender={10}
          keyExtractor={(item) => item.id}
          data={usuarios}
          className="h-[76%]"
          renderItem={({ item }) => (
            <UserCard item={item} navigation={navigation} />
          )}
        ></FlatList>
      </View>
    </View>
  );
}
