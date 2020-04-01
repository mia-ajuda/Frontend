import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import Container from "../../components/Container";
import Input from "../../components/UI/input";
import { ThemeProvider, Button } from "react-native-elements";

const theme = {
  Button: {
    containerStyle: {
      backgroundColor: "red"
    }
  }
};

export default function Main() {
  return (
    <Container style={styles.container}>
      <Text style={styles.text1}>Projeto Mia Ajuda em Ação em Title</Text>
      <Text style={styles.text2}>Projeto Mia Ajuda em Ação em Subtitle</Text>
      <Text style={styles.text3}>Projeto Mia Ajuda em Ação em body</Text>
      <Button title="Um oi aaaaa" />
      <Input label="Label" placeholder="Input placeholder" />
    </Container>
  );
}
