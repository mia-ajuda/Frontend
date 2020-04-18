import React from "react";
import { Icon } from "react-native-elements";
import { View, Text } from "react-native";
import colors from "../../../assets/styles/colorVariables";

import styles from "./styles";
import helpService from "../../services/Help";

export default function ListCard({ helpTitle, helpDescription, categoryName, deleteVisible, helpId }) {
  
  function deleteHelp () {
    helpService.deleteHelp(helpId)
  }
  
  return (
    <View style={styles.cardContainer}>
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
              name='trash-alt'
              type="font-awesome"
              color={colors.danger}
              onPress={deleteHelp}
            />
          ) : <></>}

        </View>
      </View>
    </View>
  );
}
