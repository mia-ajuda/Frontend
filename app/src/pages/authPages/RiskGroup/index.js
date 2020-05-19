import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from "react-native";
import Button from "../../../components/UI/button";
import styles from "./styles";
import { Icon } from "react-native-elements";

export default function RiskGroup({ route, navigation }) {
  const { userData } = route.params;
  console.log("RiskGroup", userData);
  const [disease, setDisease] = useState({
    dc: false,
    hiv: false,
    diab: false,
    hiperT: false,
    doenCardio: false,
  });

  const riskGroups = {
    dc: "Doença respiratória",
    hiv: "HIV",
    diab: "Diabetes",
    hiperT: "Hipertensão",
    doenCardio: "Doenças cardiovasculares",
  };

  const handleButtonPress = (id) => {
    if (disease[id] === true) {
      setDisease({ ...disease, [id]: false });
    } else setDisease({ ...disease, [id]: true });
  };

  const continueHandler = () => {
    let newDisease = [];

    for (let prop in disease) {
      if (disease[prop]) {
        newDisease.push(prop);
      }
    }

    const newUserData = {
      ...userData,
      disease: newDisease,
    };

    userData.photo
      ? console.log("pode concluir!!!")
      : navigation.navigate("photo", {
          userData: newUserData,
        });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <View style={styles.backIcon}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Icon name={"arrow-back"} color={"black"} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.text1}>
            É importante sabermos se você se encontra em um dos grupos de risco.
            Selecione caso possua alguma das condições a seguir:
          </Text>
        </View>
      </View>
      <View style={styles.input}>
        {Object.entries(riskGroups).map(([key, value]) => {
          return (
            <View key={key} style={styles.inputItem}>
              <Button
                type={!disease[key] ? "notSelected" : null}
                press={() => handleButtonPress(key)}
                large
                title={value}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={continueHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}
