import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import UserService from "../../../services/User";
import Button from "../../../components/UI/button";

import styles from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState("");

  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const emailHandler = (enteredEmail) => {
    setEmail(enteredEmail);
  };

  const passwordHandler = (enteredPassword) => {
    setPassword(enteredPassword);
  };

  const loginHandler = async () => {
    const data = { email, password };

    try {
      await UserService.logIn(data);
    } catch (err) {
      console.log(err["error"]);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.background} behavior="padding">
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
          placeholderTextColor="#FFF"
          onChangeText={emailHandler}
          value={email}
        />

        <TextInput
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#FFF"
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
        <Button
          style={styles.login}
          large
          type="white"
          title="ENTRAR"
          press={loginHandler}
          disabled={buttonDisabled}
        />

        <TouchableOpacity
          style={styles.signUP}
          onPress={() => {
            navigation.navigate("registrationData");
          }}
        >
          <Text style={styles.signupText}>Não tem uma conta?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
