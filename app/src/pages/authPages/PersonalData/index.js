import React from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function PersonalData({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text1}>
          Precisamos de algumas informações para poder realizar seu cadastro!!
          Pode me dizer seu nome, data de nascimento e CPF?
        </Text>
      </View>
      <View style={styles.inputView}>
        <Input label="Nome Completo" placeholder="Nome Completo" />
        <Input label="Data de Nascimento" placeholder="Data de" />
        <Input label="CPF" placeholder="CPF" />
      </View>
      <View style={styles.btnView}>
        <Button
          title="Continuar"
          large
          press={() => navigation.navigate("riskGroup")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
