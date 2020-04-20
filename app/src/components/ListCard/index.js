import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

export default function ListCard({
  helpTitle,
  helpDescription,
  categoryName,
  navigation,
  helpId,
  userName,
  birthday,
  city,
  helperId,
  possibleHelpers,
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
          helperId,
          possibleHelpers,
        });
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
        <View style={styles.categoryWarning}>
          <Text style={styles.categoryName}> {categoryName} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
