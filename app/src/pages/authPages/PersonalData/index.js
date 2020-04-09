import React, { useState } from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function PersonalData({ route, navigation }) {
  const { registrationData } = route.params;
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cpf, setCPF] = useState("");
  const [cpfIsValid, setCpfValid] = useState(false);

  const nameHandler = (enteredName) => {
    setName(enteredName);
  };

  const birthdayHandler = (enteredBirthday) => {
    setBirthday(enteredBirthday);
  };

  const cpfHandler = (enteredCPF) => {
    setCPF(enteredCPF);
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
        <View>
          <Text style={styles.label}>Data de Nascimento</Text>  
          <TextInputMask
            style={styles.inputMask}
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            value={birthday}
            onChangeText={text => {
              setBirthday(text)
            }}
            placeholder='Data de Nascimento'
          />
        </View>
        <View>
          <Text style={styles.label}>CPF</Text>
          <TextInputMask
            style={styles.inputMask}
            type={'cpf'}
            value={cpf}
            onChangeText={text => {
              setCPF(text);
            }}
            placeholder='Digite seu CPF'
            ref={(ref) => setCpfValid(ref)}
          />
        </View>
        {/* <Input change={cpfHandler} label="CPF" placeholder="CPF" /> */}
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={continueHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}
