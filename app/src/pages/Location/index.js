import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Location({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <TouchableOpacity
        onPress={() => {
          alert("registered!");
        }}
      >
        <Text style={styles.button}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.button}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
