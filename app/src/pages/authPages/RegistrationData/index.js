import React, { useState } from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";
import emailValidator from "../../../utils/emailValidation";
import Container from "../../../components/Container";

export default function RegistrationData({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmPass, setConfirmPass] = useState(true);
  const [cellPhone, setCellPhone] = useState("");

  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
    setEmailIsValid(emailValidator(email));
  };

  const passwordHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const confirmHandler = (enteredConfirm) => {
    password.length > 0 && password === enteredConfirm
      ? setConfirmPass(true)
      : setConfirmPass(false);

    setConfirm(enteredConfirm);
  };

  const registrationData = { email, password };

  const continueHandler = () => {
    navigation.navigate("personalData", { registrationData });
  };

  return (
    <Container>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.text1}>
              Pra começar a fazer seu cadastro, preencha seu email e senha!!
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              change={emailHandler}
              label="Email"
              placeholder="email@exemplo.com"
              valid={emailIsValid}
            />
            <View style={styles.viewMargin} />
            <Input
              type="password"
              change={passwordHandler}
              label="Senha"
              placeholder="Senha"
            />
            <View style={styles.viewMargin} />

            <Input
              change={confirmHandler}
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              type="password"
              valid={confirmPass}
            />
          </View>
          <View style={styles.btnView}>
            <Button
              disabled={
                !(
                  email.length > 0 &&
                  password.length > 0 &&
                  password === confirm
                )
              }
              title="Continuar"
              large
              press={continueHandler}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}
