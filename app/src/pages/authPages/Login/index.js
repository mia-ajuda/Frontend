import React, { useState, useEffect, useContext } from "react";
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
import colors from "../../../../assets/styles/colorVariables";


import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import actions from "../../../store/actions";

export default function Login({ navigation }) {
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingFace, setLoadingFace] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [facebookColor, setFacebookColor] = useState("#3B5998");
  const [googleColor, setGoogleColor] = useState("#d93025");

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
    const data = { email: email.trim(), password };
    Keyboard.dismiss();

    try {
      setLoading(true);
      setFacebookColor("#575757");
      setFacebookColor("#616161");
      const user = await UserService.logIn(data);
      setLoading(false);
      setGoogleColor("#d93025");
      setFacebookColor("#3B5998");

      if (user) {
        dispatch({ type: actions.user.storeUserInfo, data: user });
      }
    } catch (err) {
      setGoogleColor("#d93025");
      setFacebookColor("#3B5998");
      setLoading(false);
      Alert.alert(
        "Ooops..",
        err.error || "Algo deu errado, tente novamente mais tarde",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false,
        }
      );
    }
  };

  const loginHandlerFacebook = async () => {
    try {
      setLoadingFace(true);
      setGoogleColor("#616161");
      const user = await UserService.logInWithFacebook(navigation);
      setGoogleColor("#d93025");
      setLoadingFace(false);

      if (user) {
        dispatch({ type: actions.user.storeUserInfo, data: user });
      }
    } catch (err) {
      setGoogleColor("#d93025");
      setLoadingFace(false);
      Alert.alert(
        "Erro",
        err.error,
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  };

  const loginHandlerGoogle = async () => {
    try {
      setLoadingGoogle(true);
      setFacebookColor("#575757");
      const user = await UserService.loginInWithGoogle(navigation);
      setLoadingGoogle(false);
      setFacebookColor("#3B5998");

      if (user) {
        dispatch({ type: actions.user.storeUserInfo, data: user });
      }
    } catch (err) {
      setFacebookColor("#3B5998");
      setLoadingGoogle(false);
      Alert.alert("Erro", err.error, [{ text: "OK", onPress: () => {} }], {
        cancelable: false,
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{ flex: 1, resizeMode: "contain", marginTop: 30 }}
          source={require("../../../images/logo.png")}
        />
      </View>
      <KeyboardAvoidingView style={styles.input} 
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
      >
        <TextInput
          keyboardType="email-address"
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
      </KeyboardAvoidingView>
      <View style={styles.viewBtn}>
        <View style={styles.login}>
          {!loading ? (
            <Button
              large
              type="white"
              title="ENTRAR"
              press={loginHandler}
              disabled={
                buttonDisabled || loading || loadingFace || loadingGoogle
              }
            />
          ) : (
            <ActivityIndicator size="large" color={colors.light} />
          )}
        </View>
        <TouchableOpacity
          style={styles.signUP}
          onPress={async () => {
            navigation.navigate("location");
          }}
        >
          <Text style={styles.signupText}>Não tem uma conta?</Text>
        </TouchableOpacity>
        <View style={styles.quickLogin}>
          <View style={[{ backgroundColor: googleColor }, styles.viewGoogle]}>
            {!loadingGoogle ? (
              <TouchableOpacity
                disabled={loading || loadingFace}
                style={[styles.btnGoogle]}
                onPress={loginHandlerGoogle}
              >
                <Icon type="antdesign" name={"google"} color={"white"} />
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="large" color={colors.light} />
            )}
          </View>
          <View
            style={[{ backgroundColor: facebookColor }, styles.viewFacebook]}
          >
            {!loadingFace ? (
              <TouchableOpacity
                disabled={loading || loadingGoogle}
                style={styles.btnFacebook}
                onPress={loginHandlerFacebook}
              >
                <Icon type="font-awesome" name={"facebook"} color={"white"} />
              </TouchableOpacity>
            ) : (
              <ActivityIndicator size="large" color={colors.light} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
