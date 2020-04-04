import React, { useContext } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import { actionGetUserData } from "../../../store/actions";
import userService from "../../../services/User";

const Login = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate("signUp");
          const userData = await userService.logIn();
          console.log(userData);
          dispatch({ type: actionGetUserData, data: userData });
        }}
      >
        <Text style={styles.button}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("forgotPassword");
        }}
      >
        <Text style={styles.button}>ForgotPassword</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
