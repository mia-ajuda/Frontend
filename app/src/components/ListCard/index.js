import React, { Component } from "react";
import { View, Text } from "react-native";

import styles from "./styles";

export default class ListCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardTitle}>
          <Text style={styles.titleContent}>Titulo Genérico</Text>
        </View>
        <View style={styles.cardDescription}>
          <Text style={styles.descriptionContent}>
            Descrição da ajuda. Descrição da ajuda. Descrição da ajuda.
            Descrição da ajuda. Descrição da ajuda. Descrição da ajuda.
          </Text>
          <View style={styles.categoryWarning}>
            <Text style={styles.categoryName}>Compras</Text>
          </View>
        </View>
      </View>
    );
  }
}
