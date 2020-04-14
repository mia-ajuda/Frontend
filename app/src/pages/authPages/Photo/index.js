import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Photo({ route, navigation }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo page </Text>
      <Text style={styles.title}>Photo page </Text>
      <Text style={styles.title}>Photo page </Text>
      <Text style={styles.title}>Photo page </Text>
      <Text style={styles.title}>Photo page </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("location");
        }}
      >
        <Text style={styles.button}>NEXT PAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.button}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
