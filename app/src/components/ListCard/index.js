import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../assets/styles/colorVariables";

import styles from "./styles";

export default function ListCard({
  helpTitle,
  helpDescription,
  categoryName,
  deleteVisible,
  setConfirmationModalVisible,
  navigation,
  helpId,
  userName,
  birthday,
  city,
  setVisible,
  profilePhoto,
}) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("helpDescription", {
          helpTitle,
          helpDescription,
          categoryName,
          helpId,
          userName,
          birthday,
          city,
          profilePhoto,
        });
        setVisible(false);
      }}
    >
      <View style={styles.cardTitle}>
        <Text numberOfLines={1} style={styles.titleContent}>
          {helpTitle}
        </Text>
      </View>
      <View style={styles.cardDescription}>
        <Text numberOfLines={3} style={styles.descriptionContent}>
          {helpDescription}
        </Text>
        <View style={styles.bottomItens}>
          <View style={styles.categoryWarning}>
            <Text style={styles.categoryName}> {categoryName} </Text>
          </View>
          {deleteVisible ? (
            <Icon
              size={25}
              name="trash"
              type="font-awesome"
              color={colors.danger}
              onPress={() => setConfirmationModalVisible(true)}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
