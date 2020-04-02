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
          <Text style={styles.titleContent}>
            { this.props.helpTitle }
          </Text>
        </View>
        <View style={styles.cardDescription}>
          <Text style={styles.descriptionContent}>
            { this.props.helpDescription }
          </Text>
          <View style={styles.categoryWarning}>
            <Text style={styles.categoryName}>
              { this.props.helpCategory }
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
