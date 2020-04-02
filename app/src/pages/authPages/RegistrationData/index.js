import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text
} from "react-native";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";

export default function RegistrationData({navigation}) {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.viewText}>
        <Text style={styles.text1}>
        Pra começar a fazer seu cadastro, preencha seu email e senha!!
        </Text>
      </View>
      <View style={styles.inputView}>
        <Input label="Email" placeholder="email@exemplo.com" />
        <Input label="Senha" placeholder="Senha" />
        <Input label="Confirmar senha" placeholder="Confirme sua senha" />
      </View>
      <View style={styles.btnView}>
        <Button title="Continuar" large press={() =>
            navigation.navigate("personalData")}/>
      </View>
    </KeyboardAvoidingView>
  );
}
