import { StatusBar } from "expo-status-bar";
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
  const dogs = [
    {
      id: 1,
      name: "yoshi",
      age: "2 años o mas",
      profilePic:
        "https://resizer.glanacion.com/resizer/5QeUzKF3eQwZWQVTbjU7sL2nmgc=/768x0/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/FHNNVHNWPNHJXBGQMNPDEULCPU.jpg",
      createdAt: "2023-01-01T22:58:33.462Z",
      gallery: [
        "https://blog.mascotaysalud.com/wp-content/uploads/2018/02/perro-negro-1.jpg",
        "https://images.ecestaticos.com/lTIETeQjM7QjTBXpEcWl_yhLl3Y=/0x0:1800x1350/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fb42%2F514%2F865%2Fb425148657b493e3ea870725d7287408.jpg",
        "https://thumbs.dreamstime.com/b/perro-negro-con-otro-otra-imagen-de-251192811.jpg",
      ],
      description:
        "Me gusta jugar con una pelota y correr. Soy muy bueno con chicos y otros perritos",
      size: "medium",
    },
    {
      id: 2,
      name: "doge",
      age: "0 a 6 meses",
      profilePic:
        "https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=1200,height=675,fit=cover/article/main-picture/617a613c7592b284460012.jpg",
      createdAt: "2023-01-02T22:58:33.462Z",
      gallery: [
        "https://okdiario.com/img/2019/08/17/6-diferencias-entre-la-alimentacion-de-un-perro-y-un-gato-655x368.jpg",
        "https://thumbs.dreamstime.com/b/gatito-gris-durmiendo-en-el-sof%C3%A1-gato-armario-de-la-casa-162888338.jpg",
      ],
      description: "Soy bastante calmo. Me llevo bien con perros y gatos",
      size: "large",
    },
    {
      id: 3,
      name: "cheems",
      age: "2 años o mas",
      profilePic:
        "https://www.latercera.com/resizer/gnJjKC7qAZDFZLjJDzc0kdlgXWI=/900x600/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/PDW3FDGMEBGVXHM77NEEDMY7KU.jpg",
      createdAt: "2023-01-07T22:58:33.462Z",
      gallery: [
        "https://img.freepik.com/fotos-premium/perro-callejero-marron-que-ha-sido-cuidado-mirada-sospecha_49071-4515.jpg?w=360",
        "https://img.freepik.com/fotos-premium/perro-callejero-marron-que-ha-sido-cuidado-mirada-sospecha_49071-4517.jpg?w=2000",
      ],
      description: "me gusta salir a pasear, me llevo muy bien con nenes",
      size: "small",
    },
    {
      id: 4,
      name: "cheems samurai",
      age: "1 a 2 años",
      profilePic:
        "https://www.consumer.es/app/uploads/2019/07/img_perro-rescatado.jpg",
      createdAt: "2023-01-10T22:58:33.462Z",
      description: "soy muy amigable",
      size: "large",
    },
    {
      id: 5,
      name: "firulais",
      age: "2 años o mas",
      profilePic:
        "https://www.hogarmania.com/archivos/202004/chequeo-veterinario-en-gatos-recogidos-de-la-calle-1280x720x80xX.jpg",
      createdAt: "2023-01-12T22:58:33.462Z",
      description: "AMO dormir...",
      size: "small",
    },
    {
      id: 6,
      name: "Telmo",
      age: "5 años",
      profilePic:
        "https://s36700.pcdn.co/wp-content/uploads/2018/06/Miniature-Dachshund-dog-breed-2-600x400.jpg.optimal.jpg",
      createdAt: "2023-01-15T22:58:33.462Z",
      description:
        "Soy el perro de Santi, viajé 20 horas en auto, en el duro invierno",
      size: "medium",
    },
    {
      id: 7,
      name: "cachupin",
      age: "0 a 6 meses",
      profilePic:
        "https://images.theconversation.com/files/465530/original/file-20220526-24-59vyo6.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C5194%2C3452&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
      createdAt: "2023-01-13T22:58:33.462Z",
      description: "Soy muy mimosa, se usar la cajita con arena",
      size: "small",
    },
  ];
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        style={styles.body}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={dogs}
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
