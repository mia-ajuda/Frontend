import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../assets/styles/colorVariables";

import styles from "./styles";
import helpService from "../../services/Help";

export default function ListCard({
  helpTitle,
  helpDescription,
  categoryName,
  deleteVisible,
  helpId,
  navigation,
}) {
  function deleteHelp() {
    helpService.deleteHelp(helpId);
  }

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("helpDescription", { helpTitle });
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
              onPress={deleteHelp}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
