import React, { useContext } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import styles from "./styles";
import Button from "../../components/UI/button";
import { UserContext } from "../../store/contexts/userContext";
import actions from "../../store/actions";
import UserService from "../../services/User";

export default function Profile() {
  const { user, dispatch } = useContext(UserContext);
  const profilePhoto = user.photo.includes("http")
    ? { uri: user.photo } // google+ or facebook
    : { uri: `data:image/png;base64,${user.photo}` }; //base64

  async function logout() {
    await UserService.logOut();
    dispatch({ type: actions.user.removeUserInfo });
  }
  return (
    <ScrollView style={styles.container}>
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
        <View>
          <Text>{user.name}</Text>
        </View>
        <View>
          <Text>{user.birthday}</Text>
        </View>
        <View>
          <Text>{user.email}</Text>
        </View>
        <View>
          <Text>{user.cpf}</Text>
        </View>
        <View>
          <Text>{user.phone}</Text>
        </View>
        <Button
          press={() => {
            logout();
          }}
          title="sair"
        />
      </View>
    </ScrollView>
  );
}
