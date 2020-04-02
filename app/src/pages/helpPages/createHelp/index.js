import React from "react";
import { View, Picker, Text } from "react-native";
import styles from "./styles";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { ScrollView } from "react-native-gesture-handler";

export default function CreateHelp({ navigation }) {
  return (
    <View style={{
      height: '100%',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',
    }}>
      <Container style={styles.container}>
        <Input label="Título" />
        <View>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.picker}>
            <Picker label="Categoria">
              <Picker.Item label="" value="" />
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        <Input label="Descrição" textarea />
      </Container>
      <Container style={styles.btnContainer}>
          <Button title="Preciso de ajuda" large />
      </Container>
    </View>
  );
}
