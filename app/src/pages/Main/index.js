import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import MapView, { Marker } from "react-native-maps";
import HelpService from "../../services/Help";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [helpList, setHelpList] = useState(null);

  useEffect(() => {
    async function getLocation() {
      const { granted } = await requestPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const { latitude, longitude } = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        });
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    async function getHelpList() {
      if (currentRegion) {
        try {
          const helpList = await HelpService.getNearHelp(currentRegion);
          setHelpList(helpList);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getHelpList();
  }, [currentRegion]);

  return (
    <View style={styles.container}>
      <MapView initialRegion={currentRegion} style={styles.map}>
        {currentRegion && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
            draggable
            onDragEnd={(newCoordinates) => {
              const {
                latitude,
                longitude,
              } = newCoordinates.nativeEvent.coordinate;
              setCurrentRegion({ ...currentRegion, latitude, longitude });
            }}
          />
        )}
        {helpList &&
          helpList.map((help, index) => {
            console.log(index);
            return (
              <Marker
                key={help._id}
                coordinate={{
                  latitude: help.user[0].location.coordinates[1],
                  longitude: help.user[0].location.coordinates[0],
                }}
                pinColor="purple"
              />
            );
          })}
      </MapView>
    </View>
  );
}
