import React, { useState, useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import styles from './styles';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import Avatar from '../../components/helpAvatar';
import { Icon } from 'react-native-elements';
import mapStyle from '../../../assets/styles/mapstyle';
import colors from '../../../assets/styles/colorVariables';

import Button from '../../components/UI/button';
import CategoryListModal from '../../components/modals/category/CategoryList';
import { HelpContext } from '../../store/contexts/helpContext';
import { UserContext } from '../../store/contexts/userContext';
import { LocationContext } from '../../store/contexts/locationContext';
import HelpList from '../../components/HelpList';

export default function Main({ navigation }) {
  const [region, setRegion] = useState(null);
  const [helpListVisible, setHelpListVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { helpList } = useContext(HelpContext);
  const { currentRegion } = useContext(UserContext);
  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    setRegion(null);
  }, [region]);

  function onRegionChange(position) {
    setLocation(position);
    return setHelpListVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <CategoryListModal visible={filterModalVisible} setVisible={setFilterModalVisible} />
      <TouchableOpacity
        style={styles.recenter}
        onPress={() => {
          setRegion(currentRegion);
        }}>
        <Icon name="target-two" type="foundation" color={colors.light} size={35} />
      </TouchableOpacity>

      <MapView
        initialRegion={currentRegion}
        style={styles.map}
        region={region}
        onRegionChangeComplete={(position) => onRegionChange(position)}
        onPress={() => {
          setHelpListVisible(false);
        }}
        customMapStyle={mapStyle.day.map}>
        {currentRegion && (
          <>
            <Marker
              title="Este é você!"
              coordinate={{
                latitude: currentRegion.latitude,
                longitude: currentRegion.longitude,
              }}>
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
          helpList.map((help) => {
            const isRiskGroup = !!help.user.riskGroup.length;

            return (
              <Marker
                title={help.distance}
                key={help._id}
                tracksViewChanges={false}
                coordinate={{
                  latitude: help.user.location.coordinates[1],
                  longitude: help.user.location.coordinates[0],
                }}>
                <Avatar help={help} />
                <Callout
                  onPress={() =>
                    navigation.navigate('helpDescription', {
                      helpTitle: help.title,
                      helpDescription: help.description,
                      categoryName: help.category[0].name,
                      helpId: help._id,
                      userName: help.user.name,
                      birthday: help.user.birthday,
                      city: help.user.address.city,
                      profilePhoto: help.user.photo,
                    })
                  }
                  style={styles.callout}>
                  {isRiskGroup ? (
                    <Text style={styles.calloutPersonDistance}>Grupo de risco</Text>
                  ) : null}
                  <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {help.user.name}
                  </Text>
                  <Text style={styles.calloutPress}>Toque para ver</Text>
                </Callout>
              </Marker>
            );
          })}
      </MapView>
      {!helpListVisible && (
        <>
          <TouchableOpacity
            style={styles.filter}
            onPress={() => {
              setFilterModalVisible(!filterModalVisible);
            }}>
            <Icon name="filter" type="font-awesome" color={colors.dark} size={20} />
          </TouchableOpacity>
          <View style={styles.helpButton}>
            <Button
              title="Pedir ajuda"
              press={() => {
                navigation.navigate('createHelp');
              }}
              type="danger"
              large
            />
          </View>
        </>
      )}

      <View style={styles.helpList}>
        <HelpList
          helps={helpList}
          visible={helpListVisible}
          setVisible={setHelpListVisible}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}
