import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

export default function Location({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  console.log("========POSITION=======");
  console.log(currentRegion);
  console.log("=======================")

  useEffect(() => {
    async function getLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025
        });
      }
    }
    getLocation();
  }, []);
  
  function saveLocation(currentRegion){
    const location = {
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
    }
    console.log("=====SAVE=====")
    console.log(location)
    console.log("==============")
  }

  return (
    <View style={styles.container}>
      <MapView initialRegion={currentRegion} style={styles.map}>
        {currentRegion && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude
            }}
            draggable
            onDragEnd={newCoordinates => {
              const {
                latitude,
                longitude
              } = newCoordinates.nativeEvent.coordinate;
              setCurrentRegion({ ...currentRegion, latitude, longitude });
            }}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.locationButton} onPress={() => saveLocation(currentRegion)}>
        <Text style={styles.button}>Salvar</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.button}>Back</Text>
      </TouchableOpacity> */}
    </View>
  );
}
