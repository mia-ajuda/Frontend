import React, { useState, useEffect } from "react";
import {
  Text,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";
import emailValidator from "../../../utils/emailValidation";
import { Icon } from "react-native-elements";

export default function RegistrationData({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmPass, setConfirmPass] = useState(true);
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
  };

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

  const continueHandler = () => {
    const registrationData = { email, password };
    navigation.navigate("personalData", { registrationData });
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeAreaView}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
    >
      {!keyboardShow ? (
        <View>
          <View style={styles.backIcon}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              <Icon
                name={"arrow-back"}
                color={!keyboardShow ? "black" : "#f7f7f7"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={styles.text1}>
              Pra começar a fazer seu cadastro, preencha seu email e senha!!
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        style={[!keyboardShow ? styles.scroll : styles.scroll2]}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.form}>
          <Input
            style={styles.firstInput}
            change={emailHandler}
            label="Email"
            placeholder="email@exemplo.com"
            valid={emailIsValid}
            autoComplete={"off"}
          />
          <View style={styles.viewMargin} />

          <Input
            type="password"
            change={passwordHandler}
            label="Senha (pelo menos 8 caracteres)"
            placeholder="Senha"
            valid={password.length >= 8 || password === ""}
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
      </ScrollView>
      <View style={styles.btnView}>
        <Button
          disabled={
            !(
              email.length > 0 &&
              password.length > 0 &&
              password === confirm &&
              password.length >= 8
            )
          }
          title="Continuar"
          large
          press={continueHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
