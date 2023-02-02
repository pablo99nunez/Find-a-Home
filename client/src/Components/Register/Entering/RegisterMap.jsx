import React, { useMemo, useCallback, useState } from "react";
import MapView, { Callout, Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function RegisterMap(props) {
  console.log('asdadsasddsadasdsadsadassaadsdsa',props.route.params);
  const { latitude = -35.0, longitude = -60.0 } = props.route.params.userInput.coordinate;
  const [mapReady, setMapReady] = useState(false);
  const [lati, setLati] = useState(latitude);
  const [longi, setLongi] = useState(longitude);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onMapReady={()=>{setMapReady(true)}}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 3,
          longitudeDelta: 3,
        }}
        showsUserLocation={true}
        onPress={(obj) => {

          console.log(obj.nativeEvent.coordinate);
          setLati(obj.nativeEvent.coordinate.latitude);
          setLongi(obj.nativeEvent.coordinate.longitude);
          console.log("ACA ESTAN TUS COORDENADAS ---->", lati, longi);
          //nunca usar estados locales para setear otros estados
          //en decir: no se puede usar lati y longi dentro de setUserInput!!!!
          props.route.params.setUserInput({
            ...props.route.params.userInput,
            coordinate: {
              latitude: obj.nativeEvent.coordinate.latitude,
              longitude: obj.nativeEvent.coordinate.longitude
            },
        }); 
        }}
      >
        {mapReady && (
          <Marker
            key="clavedeReactSinoChilla"
            identifier="Mi ubcación"
            coordinate={{
              latitude: lati,
              longitude: longi,
            }}
            flat={true}
          />
        )}
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
