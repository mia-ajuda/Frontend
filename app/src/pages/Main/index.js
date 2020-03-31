import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
// import { Button } from "../../components/ui/button";
import { Button } from "react-native-elements";

export default function Main() {
  return (
    <View style={styles.container}>
      <Button title="Mia Ajuda!" />
    </View>
  );
}
