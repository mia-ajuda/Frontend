import React, { useState } from "react";

import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "../../../components/UI/input";
import colors from "../../../../assets/styles/colorVariables";
import Button from "../../../components/UI/button";
import { Icon } from "react-native-elements";
import styles from "./styles";
import validationEmail from "../../../utils/emailValidation";
import firebaseAuth from "../../../services/firebaseAuth";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [firstUse, setFirstUse] = useState(true);

  const handlerSubmit = async () => {
    try {
      await firebaseAuth.auth().sendPasswordResetEmail(email);
      navigation.goBack();
      Alert.alert(
        "Sucesso",
        "A redefinição de senha foi enviada com sucesso. Por favor, verifique seu email!",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      navigation.goBack();
      Alert.alert(
        "Ooops",
        "Não foi possível executar essa ação no momento. Por favor, tente mais tarde!",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" color="#000000" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.contentText}>
          <Icon
            name="lock"
            size={80}
            type="foundation"
            color={colors.primary}
          />
          <Text style={styles.textTitle}>Esqueceu sua senha?</Text>
          <Text style={styles.subtitle}>
            Você pode redefinir-la colocando seu email abaixo!
          </Text>
          <View style={styles.inputWrapper}>
            <Input
              placeholder="Digite seu email"
              value={email}
              change={value => {
                setIsEmailValid(validationEmail(value));
                setEmail(value);
                setFirstUse(false);
              }}
              valid={isEmailValid || firstUse}
            />
          </View>
        </View>
        <Button
          large
          press={handlerSubmit}
          title="Enviar"
          disabled={email === "" && isEmailValid}
        />
      </View>
    </View>
  );
}
