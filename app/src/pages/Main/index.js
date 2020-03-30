import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function Main() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../images/splash.png")}
        style={styles.splash}
      />
    </View>
  );
  
}
