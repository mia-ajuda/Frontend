import React, { useState, useEffect } from "react";
import { View, Picker, Text } from "react-native";
import styles from "./styles";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";

export default function CreateHelp() {
  let [title, setTitle] = useState("");
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");
  let [buttonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    if (title && category && description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [title, category, description]);

  return (
    <Container>
      <View style={styles.view}>
        <View>
          <Input
            label="Título"
            change={(text) => setTitle(text.nativeEvent.text)}
          />
          <View style={styles.margiView} />
          <View>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.picker}>
              <Picker
                label="Categoria"
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Categoria 1" value="Categoria 1" />
                <Picker.Item label="Categoria 2" value="Categoria 2" />
                <Picker.Item label="Categoria 3" value="Categoria 3" />
                <Picker.Item label="Categoria 4" value="Categoria 4" />
              </Picker>
            </View>
          </View>
          <View style={styles.margiView} />
          <Input
            label="Descrição"
            textarea
            change={(text) => setDescription(text.nativeEvent.text)}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button title="Preciso de ajuda" large disabled={buttonDisabled} />
        </View>
      </View>
    </Container>
  );
}
