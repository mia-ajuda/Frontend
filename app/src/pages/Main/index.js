import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import MapView, { Marker, Circle } from "react-native-maps";
import HelpService from "../../services/Help";
import Avatar from "../../components/helpAvatar";
import { Icon } from "react-native-elements";
import moment from "moment-timezone";
import mapStyle from "../../../assets/styles/mapstyle";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [helpList, setHelpList] = useState(null);
  const [region, setRegion] = useState(null);
  const [currentHour, setCurrentHour] = useState(
    moment.tz("America/Sao_Paulo").format("HH")
  );

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
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
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
    //use effect to watch for regionChange and clear it
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
        <Icon name="target-two" type="foundation" color="#fff" size={35} />
      </TouchableOpacity>
      <MapView
        initialRegion={currentRegion}
        style={styles.map}
        region={region}
        customMapStyle={
          currentHour > 18 || currentHour < 6
            ? mapStyle.night.map
            : mapStyle.day.map
        }
      >
        {currentRegion && (
          <>
            <Marker
              title="Este é você!"
              coordinate={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}
            >
              <Image
                source={
                  currentHour > 18 || currentHour < 6
                    ? mapStyle.night.cat
                    : mapStyle.day.cat
                }
                style={styles.catAvatar}
              />
            </Marker>
            <Circle
              center={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}
              radius={2000}
              strokeColor={
                currentHour > 18 || currentHour < 6
                  ? mapStyle.night.radiusColor
                  : mapStyle.day.radiusColor
              }
              fillColor={
                currentHour > 18 || currentHour < 6
                  ? mapStyle.night.radiusColor
                  : mapStyle.day.radiusColor
              }
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
