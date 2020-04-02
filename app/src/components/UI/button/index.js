import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Button({ text, press, type, large }) {
  let btn;

  switch (type) {
    case "white":
      btn = (
        <TouchableOpacity onPress={press}>
          <Text style={styles.label}>{text}</Text>
        </TouchableOpacity>
      );
      break;

    default:
      break;
  }
  return btn;
}
