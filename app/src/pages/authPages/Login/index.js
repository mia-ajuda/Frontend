import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import UserService from "../../../services/User";
import Button from "../../../components/UI/button";
import { Icon } from "react-native-elements";
import colors from '../../../../assets/styles/colorVariables';

import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import actions from "../../../store/actions";

export default function Login({ navigation }) {
  const { dispatch } = useContext(UserContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const emailHandler = enteredEmail => {
    setEmail(enteredEmail);
  };

  const passwordHandler = enteredPassword => {
    setPassword(enteredPassword);
  };

  const loginHandler = async () => {
    const data = { email, password };
    Keyboard.dismiss();
    setLoading(true);

    try {
      await UserService.logIn(data);

      navigation.navigate("main");
    } catch (err) {
      Alert.alert(
        "Ooops..",
        err.error || "Algo deu errado, tente novamente mais tarde",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false,
        }
      );
      setLoading(false);
    }
  };

  const loginHandlerFacebook = async () => {
    try {
      setLoading(true);
      await UserService.logInWithFacebook(navigation);
    } catch (err) {
      Alert.alert(
        "Erro",
        err.error,
        [
          {
            text: "OK",
            onPress: () => {}
          }
        ],
        {
          cancelable: false
        }
      );
    }

    setLoading(false);
  };

  const loginHandlerGoogle = async () => {
    try {
      setLoading(true);
      await UserService.loginInWithGoogle(navigation);
    } catch (err) {
      Alert.alert("Erro", err.error, [{ text: "OK", onPress: () => {} }], {
        cancelable: false
      });
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
    >
      {
        !loading ? 
        (
          <>
            <View style={styles.logo}>
              <Image
                style={{ flex: 1, resizeMode: "contain", marginTop: 30 }}
                source={require("../../../images/logo.png")}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                autoCorrect={false}
                placeholderTextColor="#FFF"
                onChangeText={emailHandler}
                value={email}
              />
      
              <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholderTextColor="#FFF"
                placeholder="Senha"
                autoCorrect={false}
                onChangeText={passwordHandler}
                value={password}
              />
              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("forgotPassword");
                  }}
                >
                  <Text style={styles.forgotPasswordtext}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>
            </View>
      
            <View style={styles.viewBtn}>
              <View style={styles.login}>
                <Button
                  large
                  type="white"
                  title="ENTRAR"
                  press={loginHandler}
                  disabled={buttonDisabled}
                />
              </View>
              <TouchableOpacity
                style={styles.signUP}
                onPress={async () => {
                  navigation.navigate("registrationData");
                }}
              >
                <Text style={styles.signupText}>Não tem uma conta?</Text>
              </TouchableOpacity>
              <View style={styles.quickLogin}>
                <View style={styles.viewGoogle}>
                  <TouchableOpacity
                    style={styles.btnGoogle}
                    onPress={loginHandlerGoogle}
                  >
                    <Icon type="antdesign" name={"google"} color={"white"} />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewFacebook}>
                  <TouchableOpacity
                    style={styles.btnFacebook}
                    onPress={loginHandlerFacebook}
                  >
                    <Icon type="font-awesome" name={"facebook"} color={"white"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={colors.light} />
            </View>
          </>
        )
      }
     
    </KeyboardAvoidingView>
  );
}
