import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function ForgotPassword({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ForgotPassword page </Text>
      <Text style={styles.title}>ForgotPassword page </Text>
      <Text style={styles.title}>ForgotPassword page </Text>
      <Text style={styles.title}>ForgotPassword page </Text>
      <Text style={styles.title}>ForgotPassword page </Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.button}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
