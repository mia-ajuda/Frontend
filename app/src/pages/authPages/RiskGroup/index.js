import React, { useState } from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function RiskGroup({ route, navigation }) {
  const { userData } = route.params;
  const [disease, setDisease] = useState({});

  const riskGroups = {
    dc: 'Doença respiratória',
    hiv: 'HIV',
    diab: 'Diabetes',
    hiperT: 'Hipertensão',
    doenCardio: 'Doenças cardiovasculares',
  };

  console.log(route.params);

  const handleButtonPress = (id) => {
    if (disease[id] === true) {
      setDisease({ ...disease, [id]: false });
    } else setDisease({ ...disease, [id]: true });
  };

  const data = { ...userData, ...disease };

  const continueHandler = () => {
    navigation.navigate("photo", { data });
  };
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text1}>
          É importante sabermos se você se encontra em um dos grupos de risco.
          Selecione caso possua alguma das condições a seguir:
        </Text>
      </View>
      <View style={styles.input}>
        {
          Object.entries(riskGroups).map(([key, value]) => {
            console.log(disease);
            return(
              <View key={key} style={styles.inputItem}>
                <Button
                  type={disease[key]  ? "white" : null}
                  press={() => handleButtonPress(key)}
                  large
                  title={ value }
                />
              </View>
            )
          })
        }
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={continueHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}
