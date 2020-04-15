import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import styles from "./styles";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import Avatar from "../../components/helpAvatar";
import { Icon } from "react-native-elements";
import mapStyle from "../../../assets/styles/mapstyle";
import colors from "../../../assets/styles/colorVariables";

import Button from "../../components/UI/button";
import CategoryListModal from "../../components/modals/category/CategoryList";
import { HelpContext } from "../../store/contexts/helpContext";
import { UserContext } from "../../store/contexts/userContext";
import HelpList from "../../components/HelpList";

export default function Main({ navigation }) {
  const [region, setRegion] = useState(null);
  const [helpListVisible, setHelpListVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { helpList } = useContext(HelpContext);
  const { currentRegion } = useContext(UserContext);

  useEffect(() => {
    setRegion(null);
  }, [region]);

  return (
    <SafeAreaView style={styles.container}>
      <CategoryListModal
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
      />
      <TouchableOpacity
        style={styles.recenter}
        onPress={() => {
          setRegion(currentRegion);
        }}
      >
        <Icon
          name="target-two"
          type="foundation"
          color={colors.light}
          size={35}
        />
      </TouchableOpacity>

      <MapView
        initialRegion={currentRegion}
        style={styles.map}
        region={region}
        onRegionChange={() => setHelpListVisible(false)}
        onPress={() => {
          setHelpListVisible(false);
        }}
        customMapStyle={mapStyle.day.map}
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
              <Image source={mapStyle.day.cat} style={styles.catAvatar} />
            </Marker>
            <Circle
              center={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}
              radius={2000}
              strokeColor={mapStyle.day.radiusColor}
              fillColor={mapStyle.day.radiusColor}
            />
          </>
        )}
        {helpList &&
          helpList.map((help) => (
            <Marker
              title={help.distance}
              key={help._id}
              coordinate={{
                latitude: help.user[0].location.coordinates[1],
                longitude: help.user[0].location.coordinates[0],
              }}
            >
              <Avatar help={help} />
              <Callout>
                <Text>{help.distance}</Text>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <TouchableOpacity
        style={styles.filter}
        onPress={() => {
          setFilterModalVisible(!filterModalVisible);
        }}
      >
        <Icon name="filter" type="font-awesome" color={colors.dark} size={20} />
      </TouchableOpacity>
      <View style={styles.helpButton}>
        <Button
          title="Pedir ajuda"
          press={() => {
            navigation.navigate("createHelp");
          }}
          type="danger"
          large
        />
      </View>

      <View style={styles.helpList}>
        <HelpList
          helps={helpList}
          visible={helpListVisible}
          setVisible={setHelpListVisible}
        ></HelpList>
      </View>
    </SafeAreaView>
  );
}
