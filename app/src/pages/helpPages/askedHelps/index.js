import React,{useContext,useEffect} from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import {HelpContext} from "../../../store/contexts/helpContext"
export default function AskedHelps() {
  return (
    <View style={styles.container}>
      <Text>i need help</Text>
      <Text>i need help</Text>
      <Text>i need help</Text>
      <Text>i need help</Text>
      <Text>i need help</Text>
      <Text>i need help</Text>
      <Text>i need help</Text>
      <Text>i need help</Text>
    </View>
  );
}
