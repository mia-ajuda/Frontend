import React, { useState, useEffect, useContext } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Text,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import UserService from "../../../services/User";
import Button from "../../../components/UI/button";
import { Icon } from "react-native-elements";
import * as Facebook from 'expo-facebook';
import firebase  from 'firebase';


import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import actions from "../../../store/actions";

export default function Login({ navigation }) {
  const { dispatch } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
<<<<<<< HEAD
  const [isLoading, setLoading] = useState(false);
=======
  const [keyboardShow, setKeyboardShow] = useState(false);
>>>>>>> 852ac45... Refactored login page style, gmail and facebook buttons

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
    Keyboard.dismiss();
    setLoading(true);

    try {
      const user = await UserService.logIn(data);
      if (user) {
        setLoading(false);
        dispatch({ type: actions.user.storeUserInfo, data: user });
      }
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

  async function logInWithFacebook() {
    try {
      await Facebook.initializeAsync('279998959666055');
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: [
          'public_profile',
          'email',
        ],
      });

      if (type === 'success') {

        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);  // Sign in with Facebook credential

        const teste = facebookProfileData.additionalUserInfo;
        console.log(teste);

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }


  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
    >
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
      <View style={{ alignItems: "flex-end", width: "90%" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("forgotPassword");
          }}
        >
          <Text style={styles.forgotPasswordtext}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewLogin}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Button
            style={styles.login}
            large
            type="white"
            title="ENTRAR"
            press={loginHandler}
            disabled={buttonDisabled}
          />
        )}

        <TouchableOpacity
          style={styles.signUP}
          onPress={() => {
            navigation.navigate("registrationData");
          }}
        >
          <Text style={styles.signupText}>Não tem uma conta?</Text>
        </TouchableOpacity>
        <View style={styles.quickLogin}>
          <View style={styles.viewGoogle}>
            <TouchableOpacity style={styles.btnGoogle}>
              <Icon type="antdesign" name={"google"} color={"white"} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewFacebook}>
            <TouchableOpacity style={styles.btnFacebook} onPress={logInWithFacebook}>
              <Icon type="font-awesome" name={"facebook"} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
