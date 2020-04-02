import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import Container from "../../components/Container";
import Input from "../../components/UI/input";
import Button from "../../components/UI/button";
import { ScrollView } from "react-native-gesture-handler";

export default function Main() {
  return (
    <ScrollView>
      <Container style={styles.container}>
        <Text style={styles.text1}>Projeto Mia Ajuda em Ação em Title</Text>
        <Text style={styles.text2}>Projeto Mia Ajuda em Ação em Subtitle</Text>
        <Text style={styles.text3}>Projeto Mia Ajuda em Ação em body</Text>
        <View style={styles.btnContainer}>
          <Button title="White" type="white" />
          <Button title="Danger" type="danger" />
        </View>
        <Button title="Warning" large type="warning" />
        <Button title="Default" large />
        <Button title="Disabled" large disabled />

        <Input label="Label" placeholder="Input placeholder" />
        <Input label="Text area" textarea />
      </Container>
    </ScrollView>
  );
}
