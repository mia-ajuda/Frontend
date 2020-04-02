import React from "react";
import { View, Picker } from "react-native";
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
        <Input label="Título"/>
        <Picker>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
        <Input label="Descrição" textarea />
        <Button title="Preciso de ajuda" large />
      </Container>
    </ScrollView>
    </View>
  );
}
