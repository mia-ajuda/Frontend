import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import MapView, { Marker } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null)
  console.log(currentRegion)
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
  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={currentRegion} 
        style={styles.map}>
         { currentRegion && (<Marker
            coordinate={
              {
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude  
              }
            }
            draggable
            onDragEnd = {(newCoordinates) => {
              const {latitude, longitude} = newCoordinates.nativeEvent.coordinate
              setCurrentRegion({...currentRegion, latitude, longitude})
            }} 
          />)}
      </MapView>
    </View>
  );
}
