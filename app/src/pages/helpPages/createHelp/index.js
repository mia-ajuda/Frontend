import React, { useState, useEffect, useContext } from "react";
import { View, Picker, Text } from "react-native";
import styles from "./styles";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import colors from "../../../../assets/styles/colorVariables";
import { CategoryContext } from "../../../store/contexts/categoryContext";

export default function CreateHelp({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState({});
  const [description, setDescription] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { categories } = useContext(CategoryContext);
  console.log(categories);

  useEffect(() => {
    if (title && category && description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [title, description, category]);

  return (
    <Container>
      <View style={styles.view}>
        <View>
          <Input label="Título" change={(text) => setTitle(text)} />
          <View style={styles.margiView} />
          <View>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.picker}>
              <Picker
                label="Categoria"
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              >
                <Picker.Item label="" value={{}} />
                {categories.map((cat) => (
                  <Picker.Item
                    key={cat._id}
                    color={colors.dark}
                    label={cat.name}
                    value={cat}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.margiView} />
          <Input
            label="Descrição"
            textarea
            change={(text) => setDescription(text)}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button title="Preciso de ajuda" large disabled={buttonDisabled} />
        </View>
      </View>
    </Container>
  );
}
