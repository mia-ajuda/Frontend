import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import MapView, { Marker, Circle } from "react-native-maps";
import HelpService from "../../services/Help";
import Avatar from "../../components/helpAvatar";
import { Icon } from "react-native-elements";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [helpList, setHelpList] = useState(null);
  const [region, setRegion] = useState(null);

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
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
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

  useEffect(() => {
    setRegion(null);
  }, [region]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          zIndex: 5,
          flexDirection: "row",
        }}
        onPress={() => {
          setRegion(currentRegion);
        }}
      >
        <Icon name="target-two" type="foundation" color="#000" size={35} />
      </TouchableOpacity>
      <MapView initialRegion={currentRegion} style={styles.map} region={region}>
        {currentRegion && (
          <>
            <Marker
              title="Este é você!"
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
            >
              <Image
                source={require("../../../assets/images/blueCat.png")}
                style={styles.catAvatar}
              />
            </Marker>
            <Circle
              center={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}
              radius={2000}
              strokeColor="rgba(0,0,0,0.2)"
              fillColor="rgba(0,0,0,0.1)"
            />
          </>
        )}
        {helpList &&
          helpList.map((help, index) => (
            <Marker
              key={help._id}
              coordinate={{
                latitude: help.user[0].location.coordinates[1],
                longitude: help.user[0].location.coordinates[0],
              }}
            >
              <Avatar />
            </Marker>
          ))}
      </MapView>
    </View>
  );
}
