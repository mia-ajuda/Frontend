import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./styles";

export default function Input({ label, placeholder, change, value }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#BDBDBD"}
        onChange={change}
        value={value}
      />
    </View>
  );
}
