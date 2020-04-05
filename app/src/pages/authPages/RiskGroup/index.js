import React, { useState } from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function RiskGroup({ route, navigation }) {
  const { userData } = route.params;
  const [hiv, setHiv] = useState(false);
  const [doencasRespiratorias, setDoencasRespiratorias] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [hipertensao, setHipertensao] = useState(false);
  const [doencasCardiovasculares, setDoencasCardiovasculares] = useState(false);

  const hivPress = () => {
    if (hiv === true) {
      setHiv(false);
    } else setHiv(true);
  };

  const doencasRespiratoriasPress = () => {
    if (doencasRespiratorias === true) {
      setDoencasRespiratorias(false);
    } else setDoencasRespiratorias(true);
  };

  const diabetesPress = () => {
    if (diabetes === true) {
      setDiabetes(false);
    } else setDiabetes(true);
  };

  const hipertnsaoPress = () => {
    if (hipertensao === true) {
      setHipertensao(false);
    } else setHipertensao(true);
  };

  const doencasCardiovascularesPress = () => {
    if (doencasCardiovasculares === true) {
      setDoencasCardiovasculares(false);
    } else setDoencasCardiovasculares(true);
  };

  const riskGroup = {
    dRespiratoria: doencasRespiratorias,
    aids: hiv,
    diabete: diabetes,
    hipertensao: hipertensao,
    dcardio: doencasCardiovasculares,
  };

  const data = { ...userData, ...riskGroup };

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
        <View style={styles.inputItem}>
          <Button
            type={doencasRespiratorias ? "white" : null}
            press={doencasRespiratoriasPress}
            large
            title="Doenças Respiratórias"
          />
        </View>
        <View style={styles.inputItem}>
          <Button
            type={hiv ? "white" : null}
            press={hivPress}
            large
            title="HIV"
          />
        </View>
        <View style={styles.inputItem}>
          <Button
            type={diabetes ? "white" : null}
            press={diabetesPress}
            large
            title="Diabétes"
          />
        </View>
        <View style={styles.inputItem}>
          <Button
            type={hipertensao ? "white" : null}
            press={hipertnsaoPress}
            large
            title="Hipertensão"
          />
        </View>
        <View style={styles.inputItem}>
          <Button
            type={doencasCardiovasculares ? "white" : null}
            press={doencasCardiovascularesPress}
            large
            title="Doenças Cardiovasculares"
          />
        </View>
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={continueHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}
