import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Card from "../Card/Card";
import { Header } from "../Header/Header";
const { width, height } = Dimensions.get("screen");

export default function Home({ navigation }) {
  const petDb = [
    {
      id: 1,
      name: "Yoshi",
      age: "2 años o mas",
      specie: "Otro",
      birthday: "2022-04-15",
      description:
        "Me gusta jugar con una pelota y correr. Soy muy bueno con chicos y otros perritos",
      size: "Medium",
      profilePic:
        "https://i.pinimg.com/originals/a9/a8/44/a9a844efde8eaaeef14e37861974a0b4.jpg",
      createdAt: "2023-01-01T22:58:33.462Z",
      gallery: [
        "https://blog.mascotaysalud.com/wp-content/uploads/2018/02/perro-negro-1.jpg",
        "https://images.ecestaticos.com/lTIETeQjM7QjTBXpEcWl_yhLl3Y=/0x0:1800x1350/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fb42%2F514%2F865%2Fb425148657b493e3ea870725d7287408.jpg",
        "https://thumbs.dreamstime.com/b/perro-negro-con-otro-otra-imagen-de-251192811.jpg",
      ],
    },
    {
      id: 2,
      name: "Doge",
      age: "0 a 6 meses",
      specie: "Perro",
      birthday: "2022-04-15",
      profilePic:
        "data:image/jpeg;base64,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",
      createdAt: "2023-01-02T22:58:33.462Z",
      gallery: [
        "https://okdiario.com/img/2019/08/17/6-diferencias-entre-la-alimentacion-de-un-perro-y-un-gato-655x368.jpg",
        "https://thumbs.dreamstime.com/b/gatito-gris-durmiendo-en-el-sof%C3%A1-gato-armario-de-la-casa-162888338.jpg",
      ],
      description: "Soy bastante calmo. Me llevo bien con perros y gatos",
      size: "Large",
    },
    {
      id: 3,
      name: "Cheems",
      age: "2 años o mas",
      specie: "Perro",
      birthday: "2022-04-15",
      profilePic: 
        "https://wallpaperaccess.com/full/3595399.jpg",
      createdAt: "2023-01-07T22:58:33.462Z",
      gallery: [
        "https://img.freepik.com/fotos-premium/perro-callejero-marron-que-ha-sido-cuidado-mirada-sospecha_49071-4515.jpg?w=360",
        "https://img.freepik.com/fotos-premium/perro-callejero-marron-que-ha-sido-cuidado-mirada-sospecha_49071-4517.jpg?w=2000",
      ],
      description: "me gusta salir a pasear, me llevo muy bien con nenes",
      size: "Small",
    },
    {
      id: 4,
      name: "Cheems samurai",
      age: "1 a 2 años",
      specie: "Perro",
      birthday: "2022-04-15",
      profilePic:
        "https://res.cloudinary.com/teepublic/image/private/s--A0BRFtE8--/c_crop,x_10,y_10/c_fit,h_1152/c_crop,g_north_west,h_1038,w_1038,x_-28,y_60/l_upload:v1565806151:production:blanks:vdbwo35fw6qtflw9kezw/fl_layer_apply,g_north_west,x_-139,y_-111/b_rgb:ffffff/c_limit,f_auto,h_630,q_90,w_630/v1637527593/production/designs/25742122_0.jpg",
      createdAt: "2023-01-10T22:58:33.462Z",
      description: "soy muy amigable",
      size: "Large",
    },
    {
      id: 5,
      name: "Firulais",
      age: "2 años o mas",
      specie: "Gato",
      birthday: "2022-04-15",
      profilePic:
        "https://www.hogarmania.com/archivos/202004/chequeo-veterinario-en-gatos-recogidos-de-la-calle-1280x720x80xX.jpg",
      createdAt: "2023-01-12T22:58:33.462Z",
      description: "AMO dormir...",
      size: "Small",
    },
    {
      id: 6,
      name: "Telmo",
      age: "5 años",
      specie: "Perro",
      birthday: "2022-04-15",
      profilePic:
        "https://s36700.pcdn.co/wp-content/uploads/2018/06/Miniature-Dachshund-dog-breed-2-600x400.jpg.optimal.jpg",
      createdAt: "2023-01-15T22:58:33.462Z",
      description:
        "Soy el perro de Santi, viajé 20 horas en auto, en el duro invierno",
      size: "Medium",
    },
    {
      id: 7,
      name: "Cachupin",
      age: "0 a 6 meses",
      specie: "Gato",
      birthday: "2022-04-15",
      profilePic:
        "https://images.theconversation.com/files/465530/original/file-20220526-24-59vyo6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C5194%2C3452&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
      createdAt: "2023-01-13T22:58:33.462Z",
      description: "Soy muy mimosa, se usar la cajita con arena",
      size: "Small",
    },
    {
      id: 8,
      name: "Mbappe",
      age: "2 años o más",
      specie: "Otro",
      birthday: "2000-01-14",
      profilePic:
        "https://vajiramandravi.s3.us-east-1.amazonaws.com/media/2018/12/18/23/14/21/5.jpg",
      createdAt: "2023-01-13T22:58:33.462Z",
      description: "juego furbo",
      size: "Medium",
    },
  ];
  const [pet, setPet] = useState(petDb);

  const filterBySpecie = (specie) => {
    console.log(specie);
    if (specie === "All") {
      setPet(petDb);
    } else setPet(petDb.filter((el) => el.specie == specie));
  };

  const filterBySize = (size) => {
    console.log(size);
    if (size === "All") {
      setPet(petDb);
    } else setPet(petDb.filter((el) => el.size == size));
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        filterBySpecie={filterBySpecie}
        filterBySize={filterBySize}
      />
      <FlatList
        style={styles.body}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={pet}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Detail", item)}>
            <Card item={item} />
          </TouchableOpacity>
        )}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa",
    width,
  },

  body: {
    backgroundColor: "#AB4E68",
    padding: 10,
  },
});
