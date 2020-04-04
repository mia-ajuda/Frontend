import React, { useContext } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";

export default function SignUp({ navigation }) {
  const { user } = useContext(UserContext);
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
          console.log(user);
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
