import React, { useState } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import Input from "../../../components/UI/input";
import colors from "../../../../assets/styles/colorVariables";
import Button from "../../../components/UI/button";
import { Icon } from "react-native-elements";
import styles from "./styles";
import validationEmail from "../../../utils/emailValidation";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [firstUse, setFirstUse] = useState(true);

  const handlerSubmit = () => {};

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
