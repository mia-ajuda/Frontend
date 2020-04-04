import React, { useContext } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import { actionGetUserData } from "../../../store/actions";
import User from "../../../models/User";

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
          // navigation.navigate("signUp");
          const data = await User.getUserData();

          dispatch({ type: actionGetUserData, data });
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
