import React, { useMemo, useCallback } from "react";
import MapView, { Callout, Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";

export default function Map(props) {
  const { latitude = 0, longitude = 0 } = props.route.params;
  const allPets = useSelector((state) => state.allPets);

  const coordsDelta = useMemo(() => 0.7111, []);

  const petRender = useCallback(
    ({ coordinates, name }) => (
      <Marker coordinate={coordinates}>
        <Callout>
          <Text>{name}</Text>
        </Callout>
      </Marker>
    ),
    []
  );
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: coordsDelta,
          longitudeDelta: coordsDelta,
        }}
        showsUserLocation
      >
        <Circle
          center={{
            latitude,
            longitude,
          }}
          radius={50000}
        />
        {allPets?.payload.map(petRender)}
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
