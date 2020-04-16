import React, { useContext } from "react";
import { View, AsyncStorage } from "react-native";
import styles from "./styles";
import Button from "../../components/UI/button";
import { UserContext } from "../../store/contexts/userContext";
import actions from "../../store/actions";

export default function Profile() {
  const { user, dispatch } = useContext(UserContext);
  async function logout() {
    await AsyncStorage.removeItem("user");
    dispatch({ type: actions.user.logout });
  }
  return (
    <View style={styles.container}>
      <Button
        press={() => {
          logout();
        }}
        title="sair"
      />
    </View>
  );
}
