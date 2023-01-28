import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function Map() {
  const allPets = useSelector((state) => state.allPets);
  useFocusEffect(
    React.useCallback(() => {
      async function evitaReturnDelUseEffect() {
        dispatch(getAllPets());
        console.log("MAPS COMPONENT", allPets);
      }
      evitaReturnDelUseEffect(); //porq saltaba un warning, pedia autonvocarla adentro
    }, [])
  );
  let pets = [
    {
      name: "Cachupin",
      latitude: -34.6769717,
      longitude: -58.413725,
    },
    { name: "Telmo", latitude: -34.679007, longitude: -58.4134203 },
    { name: "Pecu", latitude: -34.6845933, longitude: -58.4138517 },
    { name: "Mbappe", latitude: -34.6806933, longitude: -58.416695 },
    { name: "Messi", latitude: -34.6877777, longitude: -58.416695 },
  ];
  const [pin, setPin] = useState({
    latitude: -34.628517,
    longitude: -58.45905,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,
          latitudeDelta: 0.7111,
          longitudeDelta: 0.7111,
        }}
        showsUserLocation={true} //circulo azul gps
        onUserLocationChange={(e) => {
          /* console.log("onUserLocationChange", e.nativeEvent.coordinate); */

          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Circle center={pin} radius={300} />
        {/* {allPets.payload.map((el) => ( //falta ver tema de coordinates (parametro que recibe es en inglés, y la data structure nuestra salen en Esp)
          <Marker coordinate={el}>
            <Callout>
              <Text>{el.name}</Text>
            </Callout>
          </Marker>
        ))} */}

        <Marker
          coordinate={allPets.payload[allPets.payload.length - 1].latitud}
        >
          <Callout>
            <Text>{allPets.payload[allPets.payload.length - 1].name}</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
