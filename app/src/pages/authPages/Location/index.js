import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";
import Button from "../../../components/UI/button"


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
      <View style={styles.textMapContainer}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Pressione e arraste para ajustar a sua posição.</Text>
        </View>
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
        <View style={styles.instructionBox}>
          <Text style={styles.instruction}>Precisamos, também, obter a sua localização. Isso será util quando você for pedir ajuda!</Text>
        </View>
      </View>
      <View style={styles.buttonsBox}>
        <View style={styles.locationButton}>
          <Button title="Voltar" type="warning" press={() => navigation.goBack()} large />
        </View>
        <View style={styles.locationButton}>
          <Button title="Confirmar" type="default" press={() => saveLocation(currentRegion)} large />
        </View>
      </View>
    </View>
  );
}
