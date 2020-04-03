import React, { useContext } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import { actionGetUserData } from "../../../store/actions";

 const Login = ({ navigation }) => {
  const { user, dispatch } = useContext(UserContext);
  console.log("state");
  console.log(user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <Text style={styles.title}>Login page </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("signUp");
          dispatch({ type: actionGetUserData });
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
