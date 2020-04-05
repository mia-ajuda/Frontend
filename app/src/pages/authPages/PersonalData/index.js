import React, { useState } from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function PersonalData({ route, navigation }) {
  const { registrationData } = route.params;

  const [name, setName] = useState("");

  const [birthday, setBirthday] = useState("");

  const [cpf, setCPF] = useState("");

  const nameHandler = (enteredName) => {
    setName(enteredName);
  };

  const birthdayHandler = (enteredBirthday) => {
    setBirthday(enteredBirthday);
  };

  const cpfHandler = (enteredCPF) => {
    setCPF(enteredCPF);
  };

  const personalData = { Nome: name, Nascimento: birthday, CPF: cpf };

  const userData = { ...registrationData, ...personalData };

  const continueHandler = () => {
    navigation.navigate("riskGroup", { userData });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text1}>
          Precisamos de algumas informações para poder realizar seu cadastro!!
          Pode me dizer seu nome, data de nascimento e CPF?
        </Text>
      </View>
      <View style={styles.inputView}>
        <Input
          change={nameHandler}
          label="Nome Completo"
          placeholder="Nome Completo"
        />
        <Input
          change={birthdayHandler}
          label="Data de Nascimento"
          placeholder="Data de"
        />
        <Input change={cpfHandler} label="CPF" placeholder="CPF" />
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={continueHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}
