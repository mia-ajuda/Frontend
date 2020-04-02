import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function RiskGroup({ navigation }) {
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
        <Button large title="Doenças Respiratórias" />
        </View>
        <View style={styles.inputItem}>
        <Button large title="HIV" />
        </View>
        <View style={styles.inputItem}>
        <Button large title="Diabétes" />
        </View>
        <View style={styles.inputItem}>
        <Button large title="Hipertensão" />
        </View>
        <View style={styles.inputItem}>
        <Button large title="Doenças Cardiovasculares" />
        </View>
      </View>
      <View style={styles.btnView}>
        <Button
          title="Continuar"
          large
          press={() => navigation.navigate("login")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
