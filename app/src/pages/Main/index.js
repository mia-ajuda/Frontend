import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { MapView, Marker } from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4
  });
  useEffect(() => {
    async function getLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        console.log("coords");
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.4,
          longitudeDelta: 0.4
        });
      }
    }
    getLocation();
  }, []);
  return (
    <View style={styles.container}>
      <MapView initialRegion={currentRegion} style={styles.map}></MapView>
    </View>
  );
}
