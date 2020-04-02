import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateHelp({ navigation }) {
  return (
    <ScrollView>
      <Container style={styles.container}>
        <View style={styles.btnContainer}>
        </View>
        <Button title="Default" large />
        <Input label="Label" placeholder="Input placeholder" />
        <Input label="Text area" textarea />
      </Container>
    </ScrollView>
  );
}
