import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("signUp");
        }}
      >
        <Text style={styles.button}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("forgotPassword");
        }}
      >
        <Text style={styles.button}>ForgotPassword</Text>
      </TouchableOpacity>
    </View>
  );
}
