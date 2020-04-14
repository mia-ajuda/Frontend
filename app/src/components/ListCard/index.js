import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default function ListCard({ helpTitle, helpDescription }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardTitle}>
        <Text style={styles.titleContent}>{helpTitle}</Text>
      </View>
      <View style={styles.cardDescription}>
        <Text style={styles.descriptionContent}>{helpDescription}</Text>
        <View style={styles.categoryWarning}>
          <Text style={styles.categoryName}> CategoryName </Text>
        </View>
      </View>
    </View>
  );
}
