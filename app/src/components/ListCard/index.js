import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

import styles from "./styles";

export default class ListCard extends Component {
  render() {
    return (
      <Card style={styles.cardContainer}>
        <View style={styles.cardTitle}>
          <Text style={styles.titleContent}>Mia Ajuda pufavô</Text>
        </View>
        <View style={styles.cardDescription}>
          <Text style={styles.descriptionContent}>
            Descrição da ajuda. Descrição da ajuda. Descrição da ajuda.
            Descrição da ajuda. Descrição da ajuda. Descrição da ajuda.
            Descrição da ajuda. Descrição da ajuda. Descrição da ajuda.
          </Text>
        </View>
      </Card>
    );
  }
}
