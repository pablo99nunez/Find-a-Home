import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient"


const { width, height } = Dimensions.get("screen")

export default function UserDetail({route, navigation}){
  
  const user = { 
    id: 1, 
    firstName: "Messi", 
    lastName: "Chiquito",
    age: 35, 
    rating: 5 , 
    profilePic: 'https://pbs.twimg.com/media/FdSKUwgWIAEJNX0.jpg', 
    description: "Soy Lionel Andrés Messi Cuccittini, nací en Rosario, el 24 de junio de 1987, soy conocido como Leo Messi, soy un futbolista argentino que juega como delantero o centrocampista. Jugador histórico del Fútbol Club Barcelona, al que estuve ligado veinte años, y desde 2021 integro el plantel del Paris Saint-Germain de la Ligue 1 de Francia.",
    address: "Torre Eiffel",
    pets: [{ 
      id: 100, 
      name: "mbappe", 
      age: 2, 
      rescued: "2 days ago" , 
      profilePic: 'https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png', 
      createdAt: "2023-01-01T22:58:33.462Z", 
      gallery: [
      "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
      "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
      "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-seychelles/9851713-3-esl-MX/Publican-una-secuencia-genomica-de-alta-calidad-de-la-tortuga-gigante-de-Seychelles.png",
      ], 
      description: "Segundo"
    },
    { 
      id: 200, 
      name: "mauricio", 
      age: 2, 
      rescued: "2 days ago" , 
      profilePic: 'https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg', 
      createdAt: "2023-01-01T22:58:33.462Z", 
      gallery: [
      "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
      "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
      "https://www.elmueble.com/medio/2022/10/07/gato-munchkin-o-gato-salchicha_fb219737_900x900.jpg",
      ], 
      description: "No se inunda mas"
    },
    { 
      id: 300, 
      name: "juan", 
      age: 2, 
      rescued: "2 days ago" , 
      profilePic: 'https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es', 
      createdAt: "2023-01-01T22:58:33.462Z", 
      gallery: [
      "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
      "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
      "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/a/a3/FB_IMG_1596591789564.jpg/revision/latest?cb=20200806023457&path-prefix=es",
      ], 
      description: "Juan 👍"
    },
    ]
  }

  return(
    
    <View style={{height, backgroundColor: '#ACACAC'}}>
      <ImageBackground 
        style={{ width: '100%', height: 350, backgroundImage: 'linear-gradient'}}
        source={{uri: user.profilePic}}
        blurRadius={10}
      >
        <LinearGradient colors={['#00000000', '#ACACAC']} style={{height : '100%', width : '100%'}}>
          <View>
              <TouchableOpacity onPress={()=> navigation.navigate('Home')}>
                <Image 
                className="absolute top-10 left-5 w-10 h-10"
                source={require("../../images/FindAHome.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image 
                  className="absolute top-10 right-5 w-10 h-10"
                  source={require("../../images/Trust.png")}
                />
              </TouchableOpacity>
              <Image 
              className="absolute w-56 h-56 top-14 inset-x-1/4 rounded-full"
              source={{uri: user.profilePic}}
              />
              <Text className="text-center top-80 text-4xl" style={{color: "#f5c936"}}>{user.firstName} {user.lastName}</Text>
              <Text className="absolute top-96 left-5 text-center text-xl">Edad: {user.age} años</Text>
              <Text className="absolute top-96 right-5 text-center text-xl">Rating: {user.rating} ⭐</Text>
          </View>
        </LinearGradient> 
      </ImageBackground>
      <Text className="absolute bottom-60 text-base text-center m-10">{user.description}</Text>
      <View className="absolute bottom-20">
        <FlatList
          keyExtractor={(item) => item.id}
          data={user.pets}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity 
              className="grid grid-rows-3"
              onPress={() => navigation.navigate("Detail", item)}
            >
              <View className="flex items-center m-4">
                <Text>{item.name}</Text>
                <Image
                  style={{ width: 100, height: 100}}
                  source={{
                    uri: item.profilePic,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
})