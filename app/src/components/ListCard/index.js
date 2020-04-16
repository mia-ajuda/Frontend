import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function ListCard({ helpTitle, helpDescription, categoryName }) {
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
        <View style={styles.categoryWarning}>
          <Text style={styles.categoryName}> {categoryName} </Text>
        </View>
      </View>
    </View>
  );
}
