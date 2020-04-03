import React, { useState } from "react";
import { View, KeyboardAvoidingView, Text } from "react-native";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function RegistrationData({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const emailHandler = enteredEmail => {
    setEmail(enteredEmail);
  };

  const passwordHandler = enteredPassword => {
    setPassword(enteredPassword);
  };
  const confirmHandler = enteredConfirm => {
    setConfirm(enteredConfirm);
  };

  const registrationData = { Email: email, Senha: password };

  const continueHandler = () => {
    if (email.length > 0 && password.length > 0 && password == confirm) {
      navigation.navigate("personalData", { registrationData });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text1}>
          Pra começar a fazer seu cadastro, preencha seu email e senha!!
        </Text>
      </View>
      <View style={styles.inputView}>
        <Input
          change={emailHandler}
          label="Email"
          placeholder="email@exemplo.com"
        />
        <Input change={passwordHandler} label="Senha" placeholder="Senha" />
        <Input
          change={confirmHandler}
          label="Confirmar senha"
          placeholder="Confirme sua senha"
        />
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={continueHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}
