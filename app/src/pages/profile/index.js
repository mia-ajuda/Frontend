import React, { useContext } from "react";
import { View, AsyncStorage, Image } from "react-native";
import styles from "./styles";
import Button from "../../components/UI/button";
import { UserContext } from "../../store/contexts/userContext";
import actions from "../../store/actions";

export default function Profile() {
  const { user, dispatch } = useContext(UserContext);
  const profilePhoto = user.photo
    ? { uri: user.photo }
    : require("../../../assets/images/blueLogo.png");

  async function logout() {
    await AsyncStorage.removeItem("user");
    dispatch({ type: actions.user.removeUserInfo });
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          source={profilePhoto}
          style={{ width: 175, height: 175, borderRadius: 100 }}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          flex: 1,
          marginBottom: 10,
        }}
      >
        <Button
          press={() => {
            logout();
          }}
          title="sair"
        />
      </View>
    </View>
  );
}
