import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function PersonalData({ route, navigation }) {
  const { registrationData } = route.params;
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cpf, setCPF] = useState("");
  const [cpfIsValid, setCpfValid] = useState(true);
  const [birthIsValid, setBirthValid] = useState(true);

  let refCpf;
  let refDate;

  useEffect(() => {
    if (cpf !== "") {
      setCpfValid(refCpf.isValid());
    }

    if (birthday !== "") {
      setBirthValid(refDate.isValid());
    }
  }, [cpf, birthday]);

  const nameHandler = (enteredName) => {
    setName(enteredName);
  };

  const personalData = { name, birthday, cpf };

  const userData = { ...registrationData, ...personalData };

  const continueHandler = () => {
    // console.log(cpfIsValid.isValid());
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
        <View style={styles.viewMargin}></View>
        <View>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInputMask
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={birthday}
            onChangeText={(text) => {
              setBirthday(text);
            }}
            style={[styles.inputMask, styles.valid]}
            placeholder="Data de Nascimento"
            ref={(ref) => (refDate = ref)}
          />
        </View>
        <View style={styles.viewMargin}></View>
        <View>
          <Text style={styles.label}>CPF</Text>
          <TextInputMask
            type={"cpf"}
            value={cpf}
            onChangeText={(text) => {
              setCPF(text);
            }}
            style={[
              styles.inputMask,
              cpfIsValid ? styles.valid : styles.invalid,
            ]}
            placeholder="Digite seu CPF"
            ref={(ref) => (refCpf = ref)}
          />
        </View>
      </View>
      <View style={styles.btnView}>
        <Button
          title="Continuar"
          // disabled={
          //   !(cpf !== "" && cpfIsValid && birthday !== "" && birthIsValid)
          // }
          large
          press={continueHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
