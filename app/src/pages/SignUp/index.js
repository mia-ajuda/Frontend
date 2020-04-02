import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("photo");
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
