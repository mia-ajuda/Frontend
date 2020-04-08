import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import UserService from '../../../services/User';

import styles from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
  };

  const passwordHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const loginHandler = () => {
    const data = { email, password };
    console.log(data);
    UserService.logIn(data);
  };

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logo}>
        <Image
          style={{ flex: 1, resizeMode: "contain", marginTop: 30 }}
          source={require("../../../images/logo.png")}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={emailHandler}
          value={email}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Senha"
          autoCorrect={false}
          onChangeText={passwordHandler}
          value={password}
        />

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {
            navigation.navigate("main");
          }}
        >
          <Text style={styles.forgotPasswordtext}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewLogin}>
        <TouchableOpacity style={styles.login} onPress={loginHandler}>
          <Text style={styles.text}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUP}
          onPress={() => {
            navigation.navigate("photo");
          }}
        >
          <Text style={styles.signupText}>Não tem uma conta?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
