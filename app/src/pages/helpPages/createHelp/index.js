import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateHelp({ navigation }) {
  return (
    <View> 
      
    <ScrollView>
      <Container style={styles.container}>
        <View style={styles.btnContainer}>
        </View>
        <Input label="Label" placeholder="Input placeholder" />
        <Input label="Text area" textarea />
        <Button label="Preciso de ajuda" title="Default" large />
      </Container>
    </ScrollView>
    </View>
  );
}
